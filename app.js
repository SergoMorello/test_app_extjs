Ext.application({
    name: 'App',
    launch: function () {
		var tt = Ext.create('App.view.home');
		tt.getData();
		
		// var yourData = [
			 // [1, 'среднее'],
			// [2, 'бакалавр'],
			// [3, 'магистр']
		// ];
		// var store = new Ext.data.SimpleStore({
						 // id:0,
						// fields:
						// [
							// 'id',
							// 'text'
						// ],
						// data:yourData
					// });
		Ext.define('Language', {
			extend: 'Ext.data.Model',
			fields: [{
			type: 'string',
			name: 'name'
			}, {
			type: 'int',
			name: 'ID'
			}]
		});	
		var store = Ext.create('Ext.data.Store', {
			model: 'Language',
			proxy: {
				type: 'ajax',
				url: 'education.json',
				reader: {
					type: 'json',
					root: 'education'
				}
			}
		});
		var grid = Ext.create('Ext.grid.Panel', {
			store: Ext.data.StoreManager.lookup('homeStore'),
			renderTo: Ext.getBody(),
			columns: [
				{ text: 'Пользователь', dataIndex: 'user' },
				{ text: 'Образование', dataIndex: 'education', flex: 1,editor: {
					xtype: 'combo',
					queryMode:'remote',
					store: store,
					valueField: 'name',
					displayField: 'name',
				}},
				{ text: 'Город', dataIndex: 'city' }
			],
			plugins:[{
				ptype:'cellediting',
				clicksToEdit: 2
			}],
			selType: 'cellmodel',
		});
		
		grid.on('edit', function() {
			console.log('ok');
		});
		
		Ext.create('Ext.Button', {
			text: 'Click me',
			renderTo: Ext.getBody(),
			height: 30,
			handler: function() {
				tt.getData(grid);
			}
		});
    }
});


// Ext.onReady(function() {
	// var tt = Ext.create('App.view.home');
	
	
	
	// var tts = Ext.create('Ext.Button', {
		// text: 'Click me',
		// handler: function() {
			// alert('You clicked the button!');
		// }
	// });
	// Ext.create('Ext.container.Viewport', {
		// layout: 'border',
		// items: [{
			// region: 'north',
			// html: '<h1 class="x-panel-header">Тестовое задание</h1>',
			// border: false,
			// margin: '0 0 5 0'
		// }, {
			
			// region: 'center',
			// xtype: 'panel',
			// title: 'Список юзеров',
			// items:[{
				// xtype: 'grid',
				// store: Ext.data.StoreManager.lookup('homeStore'),
				// columns: [
					// { text: 'Пользователь', dataIndex: 'user' },
					// { text: 'Образование', dataIndex: 'education', flex: 1 },
					// { text: 'Город', dataIndex: 'city' }
				// ]
			// },{
				// xtype: 'button',
				// text: 'test',
				// height: 30,
				// handler: function() {
					// tt.getData();
				// }
			// }
			// ]
		// }]
	// });
// });

Ext.define('App.view.home', {
	getData:function() {
		Ext.create('Ext.data.Store', {
			storeId: 'homeStore',
			fields:[ 'user', 'education', 'city'],
			data: [
				{ user: 'Lisa', education: 'lisa@simpsons.com', city: '555-111-1224' },
				{ user: 'Bart', education: 'bart@simpsons.com', city: '555-222-1234' },
				{ user: 'Homer', education: 'homer@simpsons.com', city: '555-222-1244' },
				{ user: 'Marge', education: 'marge@simpsons.com', city: '555-222-1254' }
			]
		});
		console.log('ok');
		//grid.getView().refresh();
	},
	test:function() {
		Ext.MessageBox.alert('Мой заголовок','Модель DOM готова...');
	}
});