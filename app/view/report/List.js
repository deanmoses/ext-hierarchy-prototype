/**
 * A View that renders a list of reports in a Grid component.
 * 
 * In the Ext MVC framework, a View is responsible for simply rendering a piece of UI.
 * The actual events and actions that make use of this UI live in the controllers.
 * Views are usually defined as a subclass of an Ext JS component.
 * 
 * @author: moses
 * @date: 6/10/11
 */
Ext.define('AM.view.report.List', {
    extend: 'Ext.grid.Panel',

	/**
	 * Set up an alias so that we can use it as an xtype --
	 * means that in other files and in CSS-style selectors
	 * we refer to it by this ID rather than 'AM.view.report.List'.
	 */
    alias : 'widget.reportlist',

    title : 'All Reports',

	/**
	 * Puts the Reports data store into this.store.
	 */
	store: 'Reports',

	border: false,

	hideHeaders: true,

	animate: false,

	/**
	 * Initialize the view / component
	 */
    initComponent: function() {
		var me = this;

        me.columns = [
            {
				header: 'Title',
				dataIndex: 'title',
				flex: 1,
				sortable: false,
				renderer: this.formatTitle
			}
        ];

        me.callParent(arguments);
    },

	/**
	 * Title renderer
	 *
	 * A renderer is an 'interceptor' method which can be used transform data
	 * (value, appearance, etc.) before it is rendered.
	 *
	 * @param value The data value from the current cell
	 * @param p A collection of metadata about the current cell:  tdCls, tdAttr, and style
	 * @param record The record for the current cell's row
	 * @return The HTML to be rendered
	 * @private
	 */
	formatTitle: function(value, p, record) {
		return Ext.String.format('<div class="topic"><b>{0}</b><br/><span class="author">asdfqwer asdfqwer l;jkwqer qwejkrhbwekrh wqerkjhw qwergwqer qwegrwqerkjhw wqgrqwkerljhwerg qwegrekwgr aaaa bbbb cccc yyyy zzzz</span></div>', value || "No title");
	}

});
