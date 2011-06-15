/**
 * Left hand navigation tree widget.   Mainly contains report categories.
 *
 * @author: moses
 * @date: 6/14/11
 */
Ext.define('AM.view.category.List', {
    extend: 'Ext.tree.Panel',
	rootVisible: false,

	/**
	 * Hide the lines and use disclosure triangles as expand and collapse icons
	 */
	useArrows: true,

	/**
	 * Wrap tree in a small picture frame
	 */
	frame: false,

	/**
	 * Wrap tree in a small border
	 */
	border: false,

	/**
	 * Set up an alias so that we can use it as an xtype --
	 * means that in other files and in CSS-style selectors
	 * we refer to it by this ID rather than 'AM.view.category.List'.
	 */
	alias : 'widget.categorylist',

	/**
	 * Visible title
	 */
	title: 'Categories',

	/**
	 * Fill my tree with data from the Categories data store.
	 *
	 * Puts the store into the this.store variable.
	 */
	store: 'Categories',

    initComponent: function() {
        this.callParent(arguments);
    }
});
