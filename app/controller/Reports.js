/**
 * The Reports controller.
 * 
 * In the Ext MVC framework, controllers are the glue that binds an application together.
 * They mostly listen for events (usually from views) and take some actions.
 *
 * @author: moses
 * @date: 6/10/11
 */
Ext.define('AM.controller.Reports', {
    extend: 'Ext.app.Controller',

	/**
	 * Declare the data stores.  Ensures each store's javascript file is included when the controller loads.
	 */
	stores: [
        'Reports'
    ],

	/**
	 * Declare the data models.  Ensures each model's javascript file is included when the controller loads.
	 */
	models: ['Report'],

	/**
	 * Declare this controller's views.  Ensures each view's javascript file is included when the controller loads.
	 */
	views: [
		'report.List',
		'report.Edit'
	],

	/**
	 *  Build references to some of my views.
	 *    ref:  alias to view
	 *    selector:   CSS-style selector that chooses the view
	 *
	 *  If the ref is 'reportList', the system will create a getReportList() function to let us get the list.
	 */
	refs: [
        {
            ref: 'reportList',
            selector: 'reportlist'
        }
    ],

	/**
	 * init() is called just before the Application's launch() function.
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
			'reportlist': {
				// Tie the double click on a grid item to editReport() below
				itemdblclick: me.editReport,
				selectionchange: me.onReportSelectionChange
			},

			// Get the reportedit dialog's save button
			'reportedit button[action=save]': {
				// Tie the click to updateReport() below
				click: me.updateReport
			}
		});

		// Subscribe to the URI hash fragment change event
		this.application.on('categoryChange', this.onHashFragmentCategoryChange, this);
    },

	/**
	 * Called when the hash fragment of the page changes and triggers a category change.
	 *
	 * @param category the Category record from the CategoryStore that should now be selected.
	 */
	onHashFragmentCategoryChange: function(category) {
		console.log("Reports Controller - in onHashFragmentCategoryChange()");
		var list = this.getReportList();
		if (!list) {
			console.warn('Reports Controller - onHashFragmentCategoryChange():  called before report list UI initialized');
		}
		else {
			// Each category has a datastore of just its reports
			var reportsInSelectedCategory = category.reports();

			// I shouldn't have to sort here, but the sort specified on the model doesn't seem to work
			reportsInSelectedCategory.sort([
				{property: 'title',  direction: 'ASC'}
			]);

			// Bind the data store to the report list widget
			list.bindStore(reportsInSelectedCategory);

			list.setTitle(category.data.text);
		}
	},

	/**
	 * Initialize the UI for editing a report.
	 * 
	 * @param grid
	 * @param record
	 */
	editReport: function(grid, record) {
        // console.log('Double clicked on ' + record.get('name'));

		// Create the edit widget.  Equivalent to Ext.create('widget.reportedit')
		var view = Ext.widget('reportedit');

		// Every component in Ext JS 4 has a down function, which accepts a CSS-style.
		// Use CSS-style selector to get a reference to the edit window's form.
		view.down('form').loadRecord(record);
    },

	/**
	 * Save a report.
	 * 
	 * @param button  The Save button that was clicked.
	 */
	updateReport: function(button) {
		console.log('clicked the Save button');

		// Use CSS-style selector to get a reference to the Edit Report window
		var win    = button.up('window'),

		// Use CSS-style selector to get a reference to the form within the Edit Report window
			form   = win.down('form'),

		// Fetch the record that's currently loaded into the form
			record = form.getRecord(),

		// Fetch whatever the report has typed into the form
			values = form.getValues();

		// Update record with whatever the report has typed in
		record.set(values);

		// Close the window to bring attention back to the grid
		win.close();

		// Send updated report back to server
		this.getReportsStore().sync();
	}
});