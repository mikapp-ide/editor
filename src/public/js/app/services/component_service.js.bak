define(['angular', 'app'], function(angular, app){
	var cssMapping = {
		background_color: 'background-color',
		background_image: 'background-image',
		color: 'color',
		font_size: 'font-size',
		font_family: 'font-family',
		content_orientation: '-webkit-flex-direction',
		content_main_axis_alignment: '-webkit-justify-content',
		content_cross_axis_alignment: '-webkit-align-items',
		width: 'width',
		height: 'height'
	};

	var componentGroups = [{
		id: 'mk-general-component-group',
		label: 'General',

		items: [{
			meta: {
				type: 'mk-app-bar-component',
				label: 'Application Bar'
			}
		}, {
			meta: {
				type: 'mk-rectangle-component',
				label: 'Rectangle',
				support:{
					children: true,
					resizing: true
				}
			}
		}, {
			meta: {
				type: 'mk-button-component',
				label: 'Button',
				support:{
					text: true,
					resizing: true
				}
			},
			styles: {
				font_size: {
					value: 20
				}
			},
			properties: {
				text: {
					type: 'text',
					label: 'Text',
					value: 'Sample Button',
					configurable: true
				},
				action: {
					label: 'Action',
					type: 'select',
					value: 'lato',
					options: [{
						id: 'arial',
						label: 'Arial'
					}, {
						id: 'croissant one',
						label: 'Croissant One'
					}, {
						id: 'helvetica neue',
						label: 'Helvetica Neue'
					}, {
						id: 'lato',
						label: 'Lato'
					}]
				}
			}
		}, {
			meta: {
				type: 'mk-text-component',
				label: 'Text',
				support:{
					text: true
				}
			},
			properties: {
				text: {
					type: 'text',
					label: 'Text',
					value: 'Sample Text',
					configurable: true
				}
			}
		}, {
			meta: {
				type: 'mk-image-component',
				label: 'Image',
				support:{
					resizing: true
				}
			},

			styles: {
				background_image: {
					type: 'file',
					label: 'Image',
					value: '',
					configurable: true
				}
			}
		}, {
			meta: {
				type: 'mk-input-component',
				label: 'Input'
			}
		}, {
			meta:{
				type: 'mk-checkbox-component',
				label: 'Checkbox'
			}
		}, {
			meta:{
				type: 'mk-select-component',
				label: 'Select'
			}
		}, {
			meta:{
				type: 'mk-calendar-component',
				label: 'Calendar'
			}
		}]
	}, {
		id: 'mk-lists-component-group',
		label: 'Lists',

		items: [{
			meta:{
				type: 'mk-list-view-component',
				label: 'List View'
			}
		}, {
			meta:{
				type: 'mk-grid-view-component',
				label: 'Grid View',

				support:{
					resizing: true
				}
			}
		}, {
			meta:{
				type: 'mk-tree-view-component',
				label: 'Tree View'
			}
		}, {
			meta:{
				type: 'mk-flip-view-component',
				label: 'Flip View'
			}
		}]
	}, {
		id: 'mk-location-component-group',
		label: 'Location',

		items: [{
			meta:{
				type: 'mk-map-component',
				label: 'Map',

				support: {
					resizing: true
				}
			},

			styles: {
				background_image: {
					configurable: false
				}
			}
		}, {
			meta:{
				type: 'mk-location-component',
				label: 'Location Picker'
			}
		}]
	}, {
		id: 'mk-contracts-component-group',
		label: 'Contracts',

		items: [{
			meta:{
				type: 'mk-map-component',
				label: 'Map'
			}
		}]
	}, {
		id: 'mk-social-component-group',
		label: 'Social',

		items: [{
			meta:{
				type: 'mk-map-component',
				label: 'Map'
			}
		}]
	}];

	app.factory('component_service', function(){
		return {
			_getComponentsByGroupId: function(groupId){
				var i, length, group;

				for(i = 0, length = componentGroups.length; i < length; i++){
					group = componentGroups[i];

					if(group.id === groupId){
						return group.items;
					}
				}

				return null;
			},

			_getComponentById: function(componentId){
				var groupIndex, itemIndex, groupCount, itemCount, group, item;
				for(groupIndex = 0, groupCount = componentGroups.length; groupIndex < groupCount; groupIndex++){
					group = componentGroups[groupIndex];

					for(itemIndex = 0, itemCount = group.items.length; itemIndex < itemCount; itemIndex++){
						item = group.items[itemIndex];

						if(item.meta.type === componentId){
							return item;
						}
					}
				}

				return null;
			},

			_extend: function(source, target){
				if(target){
					return angular.extend(source, target);
				}

				return source;
			},

			getComponentGroups: function(groupId){
				if(typeof groupId === 'undefined'){
					return componentGroups;
				} else {
					return this._getComponentsByGroupId(groupId);
				}
			},

			getComponentConfig: function(id){
				var properties = angular.copy(this._getComponentById(id));

				if(!properties.styles){
					properties.styles = {};
				}

				properties.styles.background_color = this._extend({
					label: 'Background Color',
					type: 'color',
					value: 'transparent',
					order: 100
				}, properties.styles.background_color);

				if(properties.meta.support){
					if(properties.meta.support.text){

						properties.styles.font_family = this._extend({
							label: 'Font',
							type: 'select',
							value: 'lato',
							options: [{
								id: 'arial',
								label: 'Arial'
							}, {
								id: 'croissant one',
								label: 'Croissant One'
							}, {
								id: 'helvetica neue',
								label: 'Helvetica Neue'
							}, {
								id: 'lato',
								label: 'Lato'
							}],
							order: 101
						}, properties.styles.font_family);

						properties.styles.color = this._extend({
							label: 'Font color',
							type: 'color',
							value: '#c7c7c7',
							order: 102
						}, properties.styles.color);

						properties.styles.font_size = this._extend({
							label: 'Font size, px',
							type: 'number',
							value: 30,
							postfix: 'px',
							order: 103
						}, properties.styles.font_size);

						properties.styles.alignment = {
							label: 'Alignment',
							type: 'select',
							value: 'center',
							options: [{
								id: 'left',
								label: 'Left'
							},{
								id:'center',
								label: 'Center'
							},{
								id: 'right',
								label: 'Right'
							}]
						};
					}

					// if component support resizing then we have to set width and height
					if(properties.meta.support.resizing){
						properties.styles.width = {
							configurable: false
						};

						properties.styles.height = {
							configurable: false
						};
					}

					if(properties.meta.support.children){
						properties.styles.content_orientation = {
							label: 'Content Orientation',
							type: 'select',
							value: 'row',
							options: [{
								id: 'row',
								label: 'Row'
							},{
								id:'column',
								label: 'Column'
							}]
						};

						properties.styles.content_main_axis_alignment = {
							label: 'Content Main Axis Alignment',
							type: 'select',
							value: 'center',
							options: [{
								id: 'flex-start',
								label: 'Start'
							},{
								id:'center',
								label: 'Center'
							},{
								id: 'flex-end',
								label: 'End'
							},{
								id: 'space-between',
								label: 'Space Between'
							}]
						};

						properties.styles.content_cross_axis_alignment = {
							label: 'Content Cross Axis Alignment',
							type: 'select',
							value: 'center',
							options: [{
								id: 'flex-start',
								label: 'Start'
							},{
								id:'center',
								label: 'Center'
							},{
								id: 'flex-end',
								label: 'End'
							},{
								id: 'space-between',
								label: 'Space Between'
							}]
						};
					}
				}

				return properties;
			},

			/*getSettings: function(component){
				var settings = {
					css: baseSettings.css
				};b

				if(component){

					if(component.support){
						if(component.support.text){
							settings.css.splice(settings.css.length, 0, {
								id: 'color',
								label: 'Font color',
								type: 'color',
								value: '#c7c7c7'
							}, {
								id: 'font_size',
								label: 'Font size, px',
								type: 'number',
								value: 30,
								postfix: 'px'
							}, {
								id: 'alignment',
								label: 'Alignment',
								type: 'select',
								value: 'center',
								options: [{
									id: 'left',
									label: 'Left'
								},{
									id:'center',
									label: 'Center'
								},{
									id: 'right',
									label: 'Right'
								}]
							});
						}

						// if component support resizing then we have to set width and height
						if(component.support.resizing){
							settings.css.splice(settings.css.length, 0, {
								id: 'width',
								hidden: true
							}, {
								id: 'height',
								hidden: true
							});
						}

						if(component.support.children){
							settings.css.splice(settings.css.length, 0, {
								id: 'content_orientation',
								label: 'Content Orientation',
								type: 'select',
								value: 'row',
								options: [{
									id: 'row',
									label: 'Row'
								},{
									id:'column',
									label: 'Column'
								}]
							}, {
								id: 'content_main_axis_alignment',
								label: 'Content Main Axis Alignment',
								type: 'select',
								value: 'center',
								options: [{
									id: 'flex-start',
									label: 'Start'
								},{
									id:'center',
									label: 'Center'
								},{
									id: 'flex-end',
									label: 'End'
								},{
									id: 'space-between',
									label: 'Space Between'
								}]
							}, {
								id: 'content_cross_axis_alignment',
								label: 'Content Cross Axis Alignment',
								type: 'select',
								value: 'center',
								options: [{
									id: 'flex-start',
									label: 'Start'
								},{
									id:'center',
									label: 'Center'
								},{
									id: 'flex-end',
									label: 'End'
								},{
									id: 'space-between',
									label: 'Space Between'
								}]
							});
						}
					}
					if(component.type === 'mk-text-component'){
					} else if(component.type === 'mk-rectangle-component'){
					} else if(component.type === 'mk-image-component'){
						settings = settings.concat([{
							id: 'background_image',
							label: 'Image Source',
							type: 'file',
							value: 'Not Modified'
						}, {
							id: 'title',
							label: 'Title',
							type: 'text',
							value: ''
						}])
					} else if(component.type === 'mk-grid-view-component'){
						settings = settings.concat([{
							id: 'source',
							label: 'Data Source',
							type: 'select'
						}])
					} else if(component.type === 'mk-map-component'){
						var coordinates = '7.765796,-122.454042';

						settings = settings.concat([{
							id: 'background_image',
							label: 'Image Source',
							type: 'file',
							value: 'url(http://maps.googleapis.com/maps/api/staticmap?sensor=false'
								+ '&center=San+Francisco'// + coordinates
								//+ '&markers=' + 'color:red|' + coordinates
								+ '&zoom=15'
								+ '&size=600x300'
								+ '&key=AIzaSyCgPLXrKGEZhJODvc4DqmN9y2hFg_IFQuE)'

						},{
							id: 'width',
							hidden: true
						}, {
							id: 'height',
							hidden: true
						}])
					}
				}

				return settings;
			},
*/
			mapCssSetting: function(propertyName){
				if(cssMapping.hasOwnProperty(propertyName)){
					return cssMapping[propertyName];
				}
				return null;
			}
		};
	});
});