import { html, LitElement } from 'lit-element';
import { getOrgUnitData } from './data';
import * as d3 from 'd3';
import { csvParse } from 'd3-dsv';
import { cluster, stratify }  from 'd3-hierarchy';

class OrgStructureGraph extends LitElement {

    constructor() {
        super();

        this._data = csvParse(getOrgUnitData());
        console.log(this._data);
        const dataStructure = stratify()
            .id(d => d.id)
            .parentId(d => d.parent);

        this._hierarchy = dataStructure(this._data)
            .sort((a, b) => d3.descending(a.height, b.height) || d3.ascending(a.data.name, b.data.name));

        this._graph = cluster().nodeSize([20, 20])(this._hierarchy);
        console.log(this._graph);
    }

    firstUpdated() {
        this._createGraph();
    }

    _createGraph() {
        const svg = d3.select(this.shadowRoot.getElementById('graph-container')).append('svg');

        const dy = 10;

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(this._graph.links())
            .join("path")
            .attr("d", d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + dy / 2},${d.target.x}
         ${d.source.y + dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `);

        svg.append("g")
            .selectAll("circle")
            .data(this._graph.descendants())
            .join("circle")
            .attr("cx", d => d.y)
            .attr("cy", d => d.x)
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 5);

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("text")
            .data(this._graph.descendants())
            .join("text")
            .attr("x", d => d.y)
            .attr("y", d => d.x)
            .attr("dy", "0.31em")
            .attr("dx", d => d.children ? -6 : 6)
            .text(d => d.data.name)
            .filter(d => d.children)
            .attr("text-anchor", "end")
            .clone(true).lower()
            .attr("stroke", "white");

        svg.attr("viewBox", [-50, -150, 300, 300]);
    }

    _autoBox() {
        const {x, y, width, height} = this.shadowRoot.getElementById('graph-container').node().getBBox();
        return [x, y, width, height];
    }

    render() {

        return html`
            <p>Hello!</p>
            <div id="graph-container"></div>
        `;
    }
}
customElements.define('d2l-org-structure-graph', OrgStructureGraph);
