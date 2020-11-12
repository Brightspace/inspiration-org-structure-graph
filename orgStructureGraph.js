import { css, html, LitElement} from 'lit-element';
import {fetchData, getMockData} from './data';

import 'highcharts';
import 'highcharts/modules/data';
import 'highcharts/modules/sankey';
import 'highcharts/modules/organization';

class OrgStructureGraph extends LitElement {

    static get styles() {
        return [
            css`
                #graph-container {
                    height: 100%;
                    width: 100%;                    
                }
            `
        ]
    }

    constructor() {
        super();
        // this.highcharts = Highcharts;
        this._serverData = [];

        fetchData().then(data => {
            this._serverData = data;

            const nodes = data.orgUnits.map(item => {
                return {
                    id: item[0],
                    name: item[1]
                }
            });

            this._options = {
                title: {text: 'Org Structure Graph'},
                chart: {
                    height: 1000,
                    width: 900,
                    scrollablePlotArea: {
                        minHeight: 900,
                        minWidth: 900
                    },
                    panning: {
                        enabled: true,
                        type: 'xy'
                    },
                    panKey: 'shift',
                    zoomType: 'xy',
                    zoomKey: 'ctrl',
                    reflow: false
                },
                series: [{
                    type: 'organization',
                    name: 'Org Structure',
                    keys: ['to', 'from'],
                    data: data.orgUnitParents,
                    marker: {
                        symbol: 'square',
                        radius: 300,
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
                    nodes: nodes,
                    colorByPoint: false,
                    color: '#007ad0',
                    dataLabels: {
                        color: 'white'
                    },
                    borderColor: 'white',
                    nodeWidth: 100,
                    nodeHeight: 100,
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

            // TODO: fix timing weirdness

            if (this.graph) {
                this.graph.update(this._options, true, true);
            } else {
                this._createGraph();
            }
        });

    }

    // updated() {
    //     if (this.graph) {
    //         this.graph.update(this._options, true, true);
    //     } else {
    //         this._createGraph();
    //     }
    // }

    _createGraph() {
        const graphContainer = this.shadowRoot.getElementById('graph-container');
        this.graph = Highcharts.chart(graphContainer, this._options);

    }

    render() {

        return html`
            <div id="graph-container"></div>
        `;
    }
}

customElements.define('d2l-org-structure-graph', OrgStructureGraph);
