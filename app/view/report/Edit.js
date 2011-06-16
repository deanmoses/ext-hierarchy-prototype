/**
 * View that renders a Report edit dialog.
 * 
 * In the Ext MVC framework, a View is responsible for simply rendering a piece of UI.
 * The actual events and actions that make use of this UI live in the controllers.
 * Views are usually defined as a subclass of an Ext JS component.
 *
 * @author: moses
 * @date: 6/15/11
 */
Ext.define('AM.view.report.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.reportedit',

    title : 'Edit Report',
    layout: 'fit', // Sizes a single child component to take up the whole area
    autoShow: true,

	/**
	 * Initialize the view / component
	 */
    initComponent: function() {
		// Declare the UI components
        this.items = [
            {
				// There's a single form as the top-level component,
				// which contains fields to edit the name and email.
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});