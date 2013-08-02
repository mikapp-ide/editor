define(['angular'], function (angular) {
	'use strict';

	return ['$scope', 'dialog', 'ProjectService', 'component',
		function($scope, dialog, projectService, component) {

		var save = function(settings){
			settings.forEach(function(setting){
				// TODO: Remove this inefficient check
				if(component[setting.key] && component[setting.key]
					[setting.id]){
					component[setting.key][setting.id].value =
						setting.entity.value;
				}
			});
		};

		$scope.component = component;

		$scope.settings = [];

		// check whether component has parent with data source
		if(component.properties && component.properties.data_source){
			var project = projectService.getCurrentProject(),
				dataSources = [{
					id: -1,
					label: '--- none ---'
				}];

			if(project.sources.predefined.length > 0){
				project.sources.predefined.forEach(function(dataSource){
					dataSources.push({
						id: dataSource.id,
						label: dataSource.name
					});
				});
			}
			component.properties.data_source.options = dataSources;
		}

		['styles', 'properties'].forEach(function(propertyBagKey){
			var propertyBag = $scope.component[propertyBagKey];

			if(propertyBag){
				Object.keys(propertyBag).forEach(function(propertyKey){
					var property = propertyBag[propertyKey];

					if(property.configurable || typeof property.configurable ===
						'undefined'){
						$scope.settings.push({
							key: propertyBagKey,

							id: propertyKey,
							entity: angular.extend({}, property)
						});
					}
				});
			}
		});

		$scope.settings.sort(function(settingA, settingB){
			var orderA = settingA.entity.order || 200,
				orderB = settingB.entity.order || 200;

			return orderA - orderB;
		});

		var parent = component;
		while(parent = parent.parent){
			if(parent.properties && parent.properties.data_source &&
				parent.properties.data_source.value >= 0) {
				break;
			}
		}

		if(parent){

			if(!component.properties){
				component.properties = {};
			}

			var sources = projectService.getCurrentProject().sources;

			$scope.settings.push({
				key: 'properties',
				id: 'bindings',

				entity:{
					type: 'binding',
					label: 'Data Bindings',

					fields: [{
						id: -1,
						label: '--- none ---'
					}].concat($scope.settings.map(function(setting){
						return {
							id: setting.id,
							label: setting.entity.label
						};
					})),

					data_fields: [{
						id: -1,
						label: '--- none ---'
					}].concat(sources.predefined[1].fields.map(function(field,
						index){
						return {
							id: index,
							label: field.name
						};
					})),

					value: component.properties.bindings || [{
						field: -1,
						data_field: -1
					}]
				}
			});
		}

		$scope.close = function(result, settings){
			if(result === 'cancel'){
				dialog.close();
			} else {
				save(settings);
				dialog.close();
			}
		};

		$scope.title = 'Settings';

		/*$scope.message = 'This is the content of the message box';*/
		$scope.buttons = [{
			result:'cancel',
			label: 'Cancel'
		}, {
			result:'save',
			label: 'Save',
			cssClass: 'btn-primary'
		}];
	}];
});