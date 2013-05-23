define(['angular', 'app'], function (angular, app) {
	'use strict';

	var CreatePredefinedDataSourceController = function($rootScope, $scope, $http, $dialog, dialog, config, project){
		$scope.title = 'Create DataSource';

		$scope.data_types = [{
			id: 'string',
			label: 'String'
		}, {
			id: 'number',
			label: 'Number'
		}, {
			id: 'image',
			label: 'Image'
		}, {
			id: 'date',
			label: 'Date'
		}];

		$scope.data_source = {
			id: project.sources.predefined.length,
			name: 'New DataSource',
			fields: [{
				name: '',
				type: 'string'
			}],
			items:[]
		};

		var mode_buttons = {
			create_source:[{
				result:'cancel_create_source',
				label: 'Cancel'
			}, {
				result:'apply_create_source',
				label: 'Continue',
				cssClass: 'btn-primary'
			}],
			view_source_items:[{
				result:'cancel_view_source_items',
				label: 'Cancel'
			}, {
				result:'apply_view_source_items',
				label: 'Save',
				cssClass: 'btn-primary'
			}],
			create_source_item:[{
				result:'cancel_create_source_item',
				label: 'Cancel'
			}, {
				result:'apply_create_source_item',
				label: 'Save',
				cssClass: 'btn-primary'
			}]
		};

		$scope.project = project;

		$scope.switchMode = function(mode){
			$scope.mode = mode;
			$scope.buttons = mode_buttons[mode];
		};

		$scope.close = function(result, model){
			if(result === 'cancel_create_source'){
				dialog.close();
			} else if(result === 'apply_create_source'){
				$scope.switchMode('view_source_items');
			} else if(result === 'cancel_view_source_items'){
				$scope.switchMode('create_source');
			} else if(result === 'apply_view_source_items'){
				if(!$scope.project.sources){
					$scope.project.sources = {
						predefined: [],
						dynamic:[],
						feeds:[]
					};
				}

				$scope.project.sources.predefined.push(angular.copy($scope.data_source));

				dialog.close();
			} else if(result === 'cancel_create_source_item'){
				$scope.switchMode('view_source_items');
			} else if(result === 'apply_create_source_item'){
				$scope.data_source.items.push(angular.copy($scope.newItem));

				$scope.switchMode('view_source_items');
			}
		};

		$scope.switchMode('create_source');

		$scope.newItem = {};

		$scope.addNewField = function(){
			$scope.data_source.fields.push({
				name: '',
				type: 'string'
			});
		};

		$scope.addNewItem = function(){
			$scope.switchMode('create_source_item');
		};
	};

	return CreatePredefinedDataSourceController;
});