Ext.require([
    'Ext.JSON' // To support decoding the localStorage values
]);

/**
 * Provides storage for Category model instances.
 * 
 * In the Ext MVC framework, a Store class encapsulates a client side cache of Model objects.
 * Stores load data via a Proxy, and also provide functions for sorting, filtering and
 * querying the model instances contained within it.
 *
 * @author: moses
 * @date: 6/14/11
 */
Ext.define('AM.store.Categories', {
	extend: 'Ext.data.TreeStore',

	/**
	 * The model class whose instances I am storing
	 */
	model: 'AM.model.Category',

	root: Ext.JSON.decode(localStorage.categoriesJson),

	/**
	 * Proxies are the way to load and save data from a Store or a Model.
	 * There are proxies for AJAX, JSON-P and HTML5 localStorage among others.
	 */

// An attempt at using localStorage
//	proxy: {
//		type: 'localstorage',
//
//		// The browser's localStorage API puts all data into a single shared namespace.
//		// Ext uses this ID to separate this store's data from all other data in localStorage.
//		id  : 'AM.categories',
//
//		// Instructs the proxy on how to read incoming data
//		reader: {
//			type: 'json', // expect data in json format
//			root: 'categories', // the json envelope node representing the root node
//			successProperty: 'success' // the json envelope property 'success' element
//		},
//		writer: {
//			type:'json'
//		}
//	},

	proxy: {
			type: 'ajax',
			api: {
				read: 'data/category/getAll.json',
				update: 'data/category/update.json'
			},
			reader: {
				type: 'json',
				root: 'categories',
				successProperty: 'success'
			}
	},

	/**
	 * The default sorting of this store
	 */
	sorters: [
		{
			property: 'leaf',
			direction: 'ASC'
		},
		{
			property: 'text',
			direction: 'ASC'
		}
	],

	listeners: {
		/**
		 * Fires whenever the records in the Store have changed in some way and the changes
		 * have been saved back to the server.
		 *
		 * This could include adding or removing records, or updating the data in existing records
		 */
//		datachanged: function(store, options) {
//			console.log("Data changed");
//
//			// An attempt to cache the entire state of the tree in localStore
//			var categoriesJson = store.getRootNode();
//			var writer = store.getProxy().getWriter();
//			categoriesJson = writer.getRecordData(categoriesJson);
//			categoriesJson = Ext.JSON.encode(categoriesJson);
//			localStorage.setItem('categoriesJsonxx', categoriesJson);
//		}
	}
});