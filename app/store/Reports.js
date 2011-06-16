/**
 * Provides storage for Report model instances.
 *
 * In the Ext MVC framework, a Store class encapsulates a client side cache of Model objects.
 * Stores load data via a Proxy, and also provide functions for sorting, filtering and
 * querying the model instances contained within it.
 *
 * @author: moses
 * @date: 6/10/11
 */
Ext.define('AM.store.Reports', {
    extend: 'Ext.data.Store',

	/**
	 * Ask my Proxy to load the data immediately
	 */
	//autoLoad: true,
	
	/**
	 * The model class whose instances I am storing
	 */
    model: 'AM.model.Report',

	sorters: [
		{
			property: 'title',
			direction: 'ASC'
		}
	]
	
// Commented out because reports are now loaded as part of retrieving Categories.
// However, I want to bring it back when I figure out how, so that I can get
// a single list of all reports, rather than a list of reports that are in
// each category, because the per-category lists duplicate reports that live in
// multiple categories.  Want a single source of truth.
//	,
//	/**
//	 * Proxies are the way to load and save data from a Store or a Model.
//	 * There are proxies for AJAX, JSON-P and HTML5 localStorage among others.
//	 */
//	proxy: {
//		type: 'ajax',
//		api: {
//			read: 'data/report/getAll.json',
//			update: 'data/report/update.json'
//		},
//
//		/**
//		 * The reader is responsible for decoding the server response into a format the Store can understand.
//		 *
//		 * We're using a JSON reader.
//		 *
//		 * For more info on configuring the json reader:
//		 * http://docs.sencha.com/ext-js/4-0/#/api/Ext.data.reader.Json
//		 */
//		reader: {
//			type: 'json',
//			root: 'items',
//			successProperty: 'success'
//		}
//	}

});