Ext.application({
    name: 'App',
    launch: function () {
		var tt = Ext.create('App.view.home');
		//tt.getData();
		
			
		var store = Ext.create('Ext.data.Store', {
			model: 'Education',
			proxy: {
				type: 'ajax',
				url: 'education.json',
				reader: {
					type: 'json',
					root: 'education'
				}
			}
		});
		
		
		
		Ext.create('Ext.grid.Panel', {
			id: 'mainGridId',
			store: Ext.data.StoreManager.lookup('homeStore'),
			renderTo: Ext.getBody(),
			columns: [
				{ text: 'Пользователь', dataIndex: 'user' },
				{ text: 'Образование', dataIndex: 'education', flex: 1,editor: {
					xtype: 'combo',
					queryMode:'remote',
					store: store,
					value: 'ID',
					valueField: 'ID',
					displayField: 'name',
				}},
				{ text: 'Город', dataIndex: 'city' }
			],
			plugins:[{
				ptype:'cellediting',
				clicksToEdit: 2
			}],
			selType: 'cellmodel'
		});
		
		Ext.getCmp('mainGridId').on('edit', function(e,item) {
			var dataEduc = store.getAt(store.findExact('ID',Number(item.value)));
			item.record.set('education',dataEduc.data.name);
		});
		
		Ext.create('Ext.Button', {
			text: 'Refresh',
			renderTo: Ext.getBody(),
			height: 30,
			handler: function() {
				tt.getData();
			}
		});
    }
});

Ext.define('Education', {
	extend: 'Ext.data.Model',
	fields: [
		{
			type: 'int',
			name: 'ID'
		},{
			type: 'string',
			name: 'name'
		}
	]
});

Ext.define('Users', {
	extend: 'Ext.data.Model',
	fields: [
		{
			type: 'int',
			name: 'ID'
		},
		{
			type: 'string',
			name: 'user'
		},
		{
			type: 'string',
			name: 'education'
		},
		{
			type: 'string',
			name: 'city'
		}
	]
});

Ext.define('App.view.home', {
	getData:function() {
		// var store = new Ext.data.Store({
			// storeId: 'homeStore',
			// autoLoad: true,
            // autoSync: true,
			// fields:[ 'user', 'education', 'city'],
			// data: [
				// { user: 'Lisa', education: 'lisa@simpsons.com', city: '555-111-1224' },
				// { user: 'Bart', education: 'bart@simpsons.com', city: '555-222-1234' },
				// { user: 'Homer', education: 'homer@simpsons.com', city: '555-222-1244' },
				// { user: 'Marge', education: 'marge@simpsons.com', city: '555-222-1254' }
			// ]
		// });
		
		
		var dataUsers = Ext.create('Ext.data.Store', {
			model: 'Users',
			storeId: 'homeStore',
			autoLoad: true,
            autoSync: true,
			proxy: {
				type: 'ajax',
				url: 'users.json',
				reader: {
					type: 'json',
					root: 'users'
				}
			}
		});
		Ext.getCmp('mainGridId').reconfigure(dataUsers);
		//Ext.getCmp('mainGridId').store.load();
		//Ext.getCmp('mainGridId').getView().refresh();
		//grid.getStore().load();
	},
	test:function() {
		Ext.MessageBox.alert('Мой заголовок','Модель DOM готова...');
	}
});