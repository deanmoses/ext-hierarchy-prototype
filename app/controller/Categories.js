/**
 * The Category controller.
 * 
 * Controllers are the glue that binds an application together.
 * They mostly listen for events (usually from views) and take some actions.
 *
 * @author: moses
 * @date: 6/10/11
 */
Ext.define('AM.controller.Categories', {
    extend: 'Ext.app.Controller',

	/**
	 * Declare the data stores.  Ensures each store's javascript file is included when the controller loads.
	 */
	stores: [
        'Categories'
    ],

	/**
	 * Declare the data models.  Ensures each model's javascript file is included when the controller loads.
	 */
	models: ['Category'],

	/**
	 * Declare this controller's views.  Ensures each view's javascript file is included when the controller loads.
	 */
	views: [
		'category.List'
	],

	/**
	 *  Build references to some of my views.
	 *    ref:  alias to view
	 *    selector:   CSS-style selector that chooses the view
	 *
	 *  If the ref is 'list', the system will create a getList() function to let us get the list.
	 */
	refs: [
        {
            ref: 'list',
            selector: 'categorylist'
        }
    ],

	/**
	 * init() is called just before the Application's launch() function.  Nothing's rendered yet.
	 *
	 * The init function is a great place to set up how your controller interacts with the view,
	 * and is usually used in conjunction with another Controller function - control().
	 * The control() function makes it easy to listen to events on your view classes and
	 * take some action with a handler function.
	 */
    init: function() {
		var me = this;

		// Set up listeners on views
		me.control({

			// Get references to components on the page using a CSS-style selector syntax.
			// Give each component selection a map of event names (like 'render' or 'click') to handler functions.

			// Get the report list grid component.
			'categorylist': {
				selectionchange: me.onCategorySelectionChange
			}
		});

		// Subscribe to the categories store loading its data
		me.getCategoriesStore().on({
			scope: me,
			load : me.onCategoriesStoreLoad
		});

		// Subscribe to the URI hash fragment change event
		this.application.on('categoryChange', me.onHashFragmentCategoryChange, me);
    },

	/**
	 * Called when the categories store is loaded.
	 *
	 * This is the event we're waiting for to kick off the display of the
	 * categories and reports.
	 * 
	 * @param store The categories store
	 * @param nodeRecord  The root record loaded
	 */
	onCategoriesStoreLoad: function(store, nodeRecord) {
		console.log('Categories store loaded');

		// To kick the initial state of the app off, play the existing hash fragment (might be empty)
		var history = Ext.History;
		this.application.onHistoryChange(history.getToken());
	},

	/**
	 * Called when the hash fragment of the page is triggering a category change.
	 *
	 * @param record the Category record from the CategoryStore that should now be selected.
	 */
	onHashFragmentCategoryChange: function(record) {
		var list = this.getList();
		var selectionModel = list.getSelectionModel();

		// Since I myself might have caused this event by setting the hash fragment
		// in the first place, I must discard the event if the correct category is
		// already selected.   Otherwise it might cause an infinite event loop if I
		// re-select it.
		if (selectionModel.isSelected(record)) {
			console.log("I HAZ BIN ALREEDY SELETTED:  " + record.data.id);
		}
		else {
			console.log("GWINNA CHANGE ME A CATTY GORY:  " + record.data.id);
			list.selectPath(record.getPath());
		}
	},

	/**
	 * Called when the user selects a different item on the category tree.
	 *
	 * @param view
	 * @param records
	 */
    onCategorySelectionChange: function(view, records) {
        if (records.length) {
			var category = records[0].data;
			this.changeCategory(category);
        }
		else {
			console.log("WARNING:  tree node selected but no record attached");
		}
    },

	/**
	 * Change the currently selected category.
	 *
	 * @param category the ID of the category or the actual category model instance.
	 */
	changeCategory: function(category) {
		if (typeof(category) === 'object') {
			// A category object was passed in instead of a string ID.  Get the ID.
			category = category.id;
		}
		console.log("Changing to category: " + category);
		Ext.History.add('category/' + category);
	}

});