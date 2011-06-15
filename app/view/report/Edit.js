/**
 * View that handles editing a Report record within the grid.
 * 
 * A View is nothing more than a Component, usually defined as a subclass of an Ext JS component.
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