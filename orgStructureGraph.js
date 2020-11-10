import { html, LitElement } from 'lit-element';
import {getOrgData} from './data';

import 'highcharts';
import 'highcharts/modules/data';
import 'highcharts/modules/sankey';
import 'highcharts/modules/organization';

class OrgStructureGraph extends LitElement {

    constructor() {
        super();
        // this.highcharts = Highcharts;

        const rawData = getOrgData();
        const structureArray = rawData.structure.map(rel => [rel.parent, rel.child]);

        this.options = {
            title: { text: 'Org Structure Graph' },
            series: [{
                type: 'organization',
                name: 'Org Structure',
                keys: ['from', 'to'],
                data: structureArray,
                marker: {
                    symbol: 'square',
                    radius: 100,
                },
                levels: [{
                    level: 0,
                    color: 'silver',
                    dataLabels: {
                        color: 'black'
                    },
                    height: 25
                }, {
                    level: 1,
                    color: 'silver',
                    dataLabels: {
                        color: 'black'
                    },
                    height: 25
                }, {
                    level: 2,
                    color: '#980104'
                }, {
                    level: 4,
                    color: '#359154'
                }],
                nodes: rawData.orgUnits,
                colorByPoint: false,
                color: '#007ad0',
                dataLabels: {
                    color: 'white'
                },
                borderColor: 'white',
                nodeWidth: 100,
            }],
            tooltip: {
                outside: true
            },
            exporting: {
                allowHTML: true,
                sourceWidth: 800,
                sourceHeight: 600
            }
        };

    }

    updated() {
        // if (this.graph) {
        //     // this.graph.update(this.options, ...(this.updateArgs || [true, true]));
        // }
        // else {
            this._createGraph();
        // }
    }

    _createGraph() {
        const graphContainer = this.shadowRoot.getElementById('graph-container');
        this.graph = Highcharts.chart(graphContainer, this.options);

    }

    render() {

        return html`
            <div id="graph-container"></div>
        `;
    }
}
customElements.define('d2l-org-structure-graph', OrgStructureGraph);
