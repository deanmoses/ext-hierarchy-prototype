/**
 * The Category model.
 *
 * In Ext's MVC framework, the Model class is responsible for defining the structure
 * of the data (like what fields it has), but NOT actually storing the data itself.
 * The Store classes are for storing Models.
 *
 * @author: moses
 * @date: 6/14/11
 */
Ext.define('AM.model.Category', {
    extend: 'Ext.data.Model',

	requires: ['Ext.data.HasManyAssociation'],

    fields: [
		'id',
		'text',
		'leaf'
	],

	/**
	 * Creates a reports() function on every Category instance.
	 *
	 * The reports() function will return a specialized Store filtered to
	 * load only the reports for that category instance
	 */
    hasMany: {model: 'AM.model.Report', name: 'reports'},
	
	/**
	 * Return the path to the node, suitable for use in
	 * Ext.tree.Panel.expandPath() and
	 * Ext.tree.Panel.selectPath()
	 */
	getPath : function() {
		var p = this,
			field = p.idProperty,
			path = [];

		while (p) {
			path.push(p.get(field));
			p = p.parentNode;
		}
		
		path.reverse();
		return '/' + path.join('/');
	}

});