import { css, html, LitElement} from 'lit-element';
import {fetchData, getMockData} from './data';

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
        this._serverData = [];

        fetchData().then(data => {
            this._serverData = data;

            // TODO: fix timing weirdness

            this._createGraph();
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
        // make chart here
    }

    render() {

        return html`
            <div id="graph-container"></div>
        `;
    }
}

customElements.define('d2l-org-structure-graph', OrgStructureGraph);
