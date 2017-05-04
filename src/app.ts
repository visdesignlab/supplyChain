/**
 * Created by Caleydo Team on 31.08.2016.
 */

import {select} from 'd3-selection';
import {HELLO_WORLD} from './language';

import * as TableManager from './tableManager';
import * as table from 'sorTable/src/attributeTable';
import * as NodeLink from './NodeLink';

/**
 * The main class for the App app
 */
export class App {

  private $node;

  constructor(parent:Element) {
    this.$node = select(parent);

    this.$node.append('div').attr('id', 'test');
  }

  /**
   * Initialize the view and return a promise
   * that is resolved as soon the view is completely initialized.
   * @returns {Promise<App>}
   */
  init() {
    return this.build();
  }

  /**
   * Load and initialize all necessary views
   * @returns {Promise<App>}
   */
  private async build() {

    const tableManager = TableManager.create();

    // // This executes asynchronously, so you'll have to pass
    // // back a promise and resolve that before you keep going


    //Add Node Link Diagram
    const nodeLink = NodeLink.create(this.$node);
    nodeLink.init();

    await tableManager.loadData('CompanyDataLinks', 'CompanyDataCoreInfo');


    const attributeTable = table.create(this.$node.select('#graphTable').node());
    attributeTable.init(tableManager);

    //
    //
    //
    // /** =====  PRIVATE CASES - WORKS ONLY WITH THE RIGHT DATA LOCALLY ===== */
    //
    // // await tableManager.loadData('TenFamiliesDescend', 'TenFamiliesAttr');
    // // await tableManager.loadData('AllFamiliesDescend', 'AllFamiliesAttributes');
    // /** ============= */
    //
    // const attributePanel = panel.create(this.$node.select('#data_selection').node());
    // attributePanel.init(tableManager);
    //
    // const graphDataObj = graphData.create(tableManager);
    // await graphDataObj.createTree();
    //
    // // console.log('tree')
    // const genealogyTree = tree.create(this.$node.select('#graph_table').node());
    // genealogyTree.init(graphDataObj);
    //
    // // console.log('table')
    // const attributeTable = table.create(this.$node.select('#graph_table').node());
    // attributeTable.init(tableManager);
    //
    // const familySelectorView = familySelector.create(this.$node.select('#familySelector').node());
    // familySelectorView.init(tableManager);




    this.$node.select('h3').remove();
    this.setBusy(false);


    return Promise.resolve(null);
  }

  /**
   * Show or hide the application loading indicator
   * @param isBusy
   */
  setBusy(isBusy: boolean) {
    this.$node.select('.busy').classed('hidden', !isBusy);
  }

}

/**
 * Factory method to create a new app instance
 * @param parent
 * @returns {App}
 */
export function create(parent:Element) {
  return new App(parent);
}
