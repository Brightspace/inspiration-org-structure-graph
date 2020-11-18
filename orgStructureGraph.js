import { css, html, LitElement} from 'lit-element';
import {fetchData, fetchMockData, ORG_UNIT } from './data';

import * as d3 from 'd3';

const semesterType = '5'; // TODO: configurable

function arrayToNode(arr) {
    return {
        id: arr[ORG_UNIT.ID],
        name: arr[ORG_UNIT.NAME],
        type: arr[ORG_UNIT.TYPE]
    };
}

class OrgStructureGraph extends LitElement {

    static get styles() {
        return [css`
            .graph-container {
                height: 92vh;
                width: 49.5%;
                display: inline-block;
                white-space: no-wrap;
                overflow: scroll;
            }
            
            .graph-title {
                margin: 10px;
            }
        `];
    }

    constructor() {
        super();
        this._rawData = [];
        this._orgUnitHierarchy = null;
        this._semesterHierarchy = null;

        // TODO: make "demo" an attribute
        Promise.all([fetchData(), this.updateComplete]).then(([data]) => {
            this._rawData = data;
            this._processData(data);
            this._createGraph();
        });
    }

    // convert rawData (orgUnit + orgUnitParents lists) into separate lists; 1 for standard org unit tree and
    // 1 for semester tree
    _processData(rawData) {
        const semesterIds = rawData.orgUnits
            .filter(d => d[ORG_UNIT.TYPE] === semesterType)
            .map(d => d[ORG_UNIT.ID]);

        const rootId = rawData.orgUnitParents
            .filter(oup => oup[1] === '0')
            .map(oup => oup[0])[0];

        const orgUnitTreeParents = new Map();
        const semesterTreeParents = new Map();

        rawData.orgUnitParents.forEach(([child, parent]) => {
            if (semesterIds.includes(child) || semesterIds.includes(parent)) {
                // add both to semester tree
                semesterTreeParents.set(child, parent);
            } else {
                orgUnitTreeParents.set(child, parent);
            }
        });

        const orgUnitNodes = [];
        const semesterNodes = [];

        rawData.orgUnits.forEach(ou => {
            let ouObj = arrayToNode(ou);

            if (ouObj.id === rootId) {
                // add to both lists
                ouObj = { ...ouObj, parentId: '' };
                orgUnitNodes.push(ouObj);
                semesterNodes.push(ouObj);
            } else {
                if (semesterTreeParents.has(ouObj.id)) {
                    semesterNodes.push({ ...ouObj, parentId: semesterTreeParents.get(ouObj.id) });
                }

                if (orgUnitTreeParents.has(ouObj.id)) {
                    orgUnitNodes.push({ ...ouObj, parentId: orgUnitTreeParents.get(ouObj.id) });
                }
            }
        });

        const stratifier = d3.stratify(); // with default settings

        this._orgUnitHierarchy = stratifier(orgUnitNodes);
        this._semesterHierarchy = stratifier(semesterNodes);
    }

    _createGraph() {
        const orgUnitGraphContainer = this.shadowRoot.getElementById('org-unit-graph-container');
        const semesterGraphContainer = this.shadowRoot.getElementById('semester-graph-container');

        const ouGraphContainerWidth = orgUnitGraphContainer.clientWidth;
        const semesterGraphContainerWidth = semesterGraphContainer.clientWidth;

        const orgUnitGraphSvg = this._hierarchyToSvg(this._orgUnitHierarchy, ouGraphContainerWidth);
        const semesterGraphSvg = this._hierarchyToSvg(this._semesterHierarchy, semesterGraphContainerWidth);

        orgUnitGraphContainer.append(orgUnitGraphSvg);
        semesterGraphContainer.append(semesterGraphSvg);
    }

    _hierarchyToSvg(hierarchy, width) {

        // NB: x is vertical axis; y is horizontal axis for this example (since the graph is "inverted")
        const dx = 15; // vertical distance between each node
        const dy = width / (hierarchy.height + 1); // horizontal distance between each "level"

        const root = d3.tree().nodeSize([dx, dy])(hierarchy);

        // x1 = left bound; x0 = right bound
        let x0 = Infinity;
        let x1 = -x0;
        root.each(d => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        // create top-level svg
        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, x1 - x0 + dx * 2]); // viewBox: x, y, width, height

        const g = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("transform", `translate(${dy / 3},${dx - x0})`);  // dy/3 gives some left padding
                                                                    // dx - x0 is exactly halfway down the page
        // paths between nodes
        const link = g.append("g")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal() // linkHorizontal creates a smooth curve between 2 points
                .x(d => d.y)
                .y(d => d.x));

        // nodes
        const node = g.append("g")
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 3)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`); // puts the node in the location calculated by tree()

        node.append("circle")
            .attr("fill", d => d.children ? "#555" : "#999")
            .attr("r", 2.5);

        // text for nodes
        node.append("text")
            .attr("dy", "0.31em")
            .attr("x", d => d.children ? -6 : 6)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name)
            .clone(true).lower()
            .attr("stroke", "white");

        return svg.node();
    }

    render() {
        return html`
            <div id="org-unit-graph-container" class="graph-container">
                <h3 class="graph-title">Org Unit Structure</h3>
            </div>
            <div id="semester-graph-container" class="graph-container">
                <h3 class="graph-title">Semester Structure</h3>
            </div>
        `;
    }
}

customElements.define('d2l-org-structure-graph', OrgStructureGraph);
