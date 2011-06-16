Ext.require([
    'Ext.util.History',
	'Ext.JSON'
]);

/**
 * This is the main javascript file for a Sencha Ext javascript application.
 *
 * This particular application prototypes a hierarchical category model, displayed in a tree.
 *
 * Every Ext JS 4 application starts with an instance of Application class.
 * The Application contains global settings for your application (such as the app's name),
 * as well as maintains references to all of the models, views and controllers
 * used by the app.
 *
 * An Application also contains a launch function, which is run automatically when
 * everything is loaded.
 *
 * @author: moses
 * @date: 6/10/11
 */
Ext.application({ // Creates a new instance of the Application class

	/**
	 * Set up my application's namespace.
	 *
	 * Creates a global variable named AM (for Application Manager) and registers the namespace with Ext.Loader
	 */
	name: 'AM',

	/**
	 * Path to directory containing the models, views, controllers, etc
	 */
	appFolder: 'app',

	/**
	 * Load the javascript files for these model(s) and call their
	 * init() functions just before the Application's launch().
	 */
	models: ['Category', 'Report'],

	/**
	 * Load the javascript files for these controller(s) and call their
	 * init() functions just before the Application's launch().
	 */
	controllers: ['Categories', 'Reports'],

	/**
	 * Load and instantiate app/view/Viewport.js before firing the launch function.
	 */
	autoCreateViewport: true,

	/**
	 * Initialization stuff, happens before launch().
	 */
	initComponent: function() {
		console.log('in app.initComponent()');

		// Declare that I broadcast the categoryChange event
		this.addEvents('categoryChange');
	},

	/**
	 * Launch is called after the entire app's been initialized, including all controllers and views.
	 */
	launch: function() {
		console.log('in app.launch()');

		// Ext.History allows you to listen for the URI hash fragment changing (the #whatever part of the URL)
		var history = Ext.History;
		history.iframeId = 'x-history-frame'; // IE 8 and earlier require an iframe in the page to implement history
		history.init();
		history.on('change', this.onHistoryChange, this);
	},

	/**
	 * Playing around with various ways to cache data in HTML5 localStorage
	 */
//	updateCategories: function() {
//
//	These are random snippets of code that I was commenting and uncommented to
//	test various ways of doing localStorage;  it's not a cohesive, linear method.
//
//		var categoryJson = localStorage.getItem('categoriesJson');
//		if (categoryJson) {
//			categoryJson = Ext.JSON.decode(localStorage.categoriesJson);
//			var localCategoriesStore = Ext.data.StoreManager.lookup('Categories');
//			localCategoriesStore.setRootNode(categoriesJson);
//		}
//
//		Ext.Ajax.request({
//			url: 'data/category/getAll.json',
//			success: function(response, opts) {
//				var categoriesJson = Ext.JSON.decode(response.responseText);
//
//				//localStorage.categoriesJson
//				//var categoryJson = Ext.JSON.decode(localStorage.categoriesJson);
//				var localCategoriesStore = Ext.data.StoreManager.lookup('Categories');
//				localCategoriesStore.setRootNode(categoriesJson);
//
//				localCategoriesStore.getRootNode().appendChild({id: 103, text: 'Laffy Taffy'});
//				debugger;
//				localCategoriesStore.sync();
//			}
//		});
//	},

	/**
	 * Called when the URI hash fragment changes (the #hash part of the URL).
	 * 
	 * @param hashFragment The new value of the URI's #hash fragment
	 */
	onHistoryChange: function(hashFragment) {
		console.log('History was changed to: ' + hashFragment);
		var me = this;

		// Empty hash fragment:  display first category
		if (!hashFragment) {
			var categoryStore = me.getStore('Categories');
			var record = categoryStore.getRootNode().firstChild;
			me.fireEvent('categoryChange', record);
		}
		// Else parse hash fragment and decide on appropriate action
		else {
			var hashParts = hashFragment.split('/');
			var controllerName = hashParts[0];
			if (controllerName === 'category') {
				var categoryId = hashParts[1];
				var categoryStore = me.getStore('Categories');
				var record = categoryStore.getNodeById(categoryId);
				if (record) {
					me.fireEvent('categoryChange', record);
				}
				else {
					console.log("WARNING: could not find category with ID " + categoryId);
				}
			}
			else {
				console.log("WARNING: unrecognized URI hash fragment format: " + hashFragment);
			}
		}
	}

});