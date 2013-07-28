define(function () {
	'use strict';

	return ['$scope', 'ProjectService', function ($scope, projectService) {
		/*var project = projectService.getCurrentProject(),
			dataSources = [{
				id: -1,
				label: '--- none ---'
			}];*/

		$scope.component.properties = {};
/*

		if(project.sources.predefined.length > 0){
			project.sources.predefined.forEach(function(dataSource){
				dataSources.push({
					id: dataSource.id,
					label: dataSource.name
				});
			});
		}
*/

		$scope.component.properties.data_source = {
			type: 'select',
			label: 'Data Source',
			value: -1,

			options: []
		};

		$scope.component.item_template = {
			components: []
		};

		$scope.item_template_component = {
			type: 'mk-rectangle-component',

			properties: {
				bindings:[]
			}
		};
	}];
});