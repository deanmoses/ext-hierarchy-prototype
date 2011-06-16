/**
 * The Viewport is Ext's name for the UI component that covers the entire screen.
 *
 * All other UI components live inside me.
 *
 * In the Ext MVC framework, a View is responsible for simply rendering a piece of UI.
 * The actual events and actions that make use of this UI live in the controllers.
 * Views are usually defined as a subclass of an Ext JS component.
 *
 * @author: moses
 * @date: 6/14/11
 */
Ext.define('AM.view.Viewport', {
    extend: 'Ext.container.Viewport',

	layout: 'border', // border layout: north-south-east-west

	// Declare my child UI components.  Ext's loading system will take care of
	// resolving the file names and downloading the right JS files

	items: [
		// West:  navigation tree
		{
			xtype: 'panel',
			region: 'west',
			layout: 'fit',
			autoScroll: true,
			id: 'westPanel',
			width: 200,
			items: [
				{
					xtype: 'categorylist'
				}
			]
		},
		// Center:  list of reports
		{
			xtype: 'panel',
			region: 'center',
			layout: 'fit',
			autoScroll: true,
			id: 'centerPanel',
			items: [
				{
					xtype: 'reportlist'
				}
			]
		},
		// East: auxiliary information
		{
			xtype: 'panel',
			region: 'east',
			layout: 'fit',
			id: 'eastPanel'
		},
		// North:  header
		{
			xtype: 'panel',
			region: 'north',
			height: 59,
			id: 'headerPanel'
		},
		// South:  footer
		{
			xtype: 'panel',
			region: 'south',
			height: 45,
			id: 'footerPanel'
		}
	]

});