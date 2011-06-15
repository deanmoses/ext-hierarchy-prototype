/**
 * Provides storage for the Category model objects.
 * 
 * The Store class encapsulates a client side cache of Model objects. Stores load data via a Proxy,
 * and also provide functions for sorting, filtering and querying the model instances contained within it.
 *
 * @author: moses
 * @date: 6/14/11
 */
Ext.define('AM.store.Categories', {
	extend: 'Ext.data.TreeStore',
	model: 'AM.model.Category',
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
	sorters: [
		{
			property: 'leaf',
			direction: 'ASC'
		},
		{
			property: 'text',
			direction: 'ASC'
		}
	]
});