/**
 * The Report model.
 *
 * In Ext's MVC framework, the Model class is responsible for defining the structure
 * of the data (like what fields it has), but NOT actually storing the data itself.
 * The Store classes are for storing Models.
 *
 * @author: moses
 * @date: 6/10/11
 */
Ext.define('AM.model.Report', {
    extend: 'Ext.data.Model',
    fields: [
		'id',
		'title',
		'description'
	]
});