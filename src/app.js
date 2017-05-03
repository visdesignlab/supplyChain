/**
 * Created by Caleydo Team on 31.08.2016.
 */
import * as tslib_1 from "tslib";
import { select } from 'd3-selection';
import * as TableManager from './tableManager';
/**
 * The main class for the App app
 */
var App = (function () {
    function App(parent) {
        this.$node = select(parent);
    }
    /**
     * Initialize the view and return a promise
     * that is resolved as soon the view is completely initialized.
     * @returns {Promise<App>}
     */
    App.prototype.init = function () {
        return this.build();
    };
    /**
     * Load and initialize all necessary views
     * @returns {Promise<App>}
     */
    App.prototype.build = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tableManager;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tableManager = TableManager.create();
                        // // This executes asynchronously, so you'll have to pass
                        // // back a promise and resolve that before you keep going
                        // // await tableManager.loadData('big-decent-clipped-38');
                        //
                        //
                        // /** =====  PUBLIC CASE ===== */
                        //
                        // await tableManager.loadData('TenFamiliesDescendAnon', 'TenFamiliesAttrAnon');
                        return [4 /*yield*/, tableManager.loadData('CompanyDataLinks', 'CompanyDataCoreInfo')];
                    case 1:
                        // // This executes asynchronously, so you'll have to pass
                        // // back a promise and resolve that before you keep going
                        // // await tableManager.loadData('big-decent-clipped-38');
                        //
                        //
                        // /** =====  PUBLIC CASE ===== */
                        //
                        // await tableManager.loadData('TenFamiliesDescendAnon', 'TenFamiliesAttrAnon');
                        _a.sent();
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
                        return [2 /*return*/, Promise.resolve(null)];
                }
            });
        });
    };
    /**
     * Show or hide the application loading indicator
     * @param isBusy
     */
    App.prototype.setBusy = function (isBusy) {
        this.$node.select('.busy').classed('hidden', !isBusy);
    };
    return App;
}());
export { App };
/**
 * Factory method to create a new app instance
 * @param parent
 * @returns {App}
 */
export function create(parent) {
    return new App(parent);
}
//# sourceMappingURL=app.js.map