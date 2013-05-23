define([
	'angular',
	'app',
	'app/controllers/dialogs/create_application_page_controller',
	'app/controllers/dialogs/create_predefined_data_source_controller'
], function (angular, app, create_application_page_controller, create_predefined_data_source_controller) {
	'use strict';

	return app.controller(
		'ProjectDetailsController',

		['$rootScope', '$scope', '$location', '$dialog', '$routeParams', 'config', 'component_service', 'project_service',

		function ($rootScope, $scope, $location, $dialog, $routeParams, config, componentService, projectService) {

			projectService.loadProject($routeParams.id).then(function(project){
				$scope.project = project;

				$scope.activePage = $scope.project.pages[0];

				$scope.downloadLink = config.services.compile + '/api/compile/' + $scope.project.id;
			});

			$scope.toolBox = componentService.getComponents();

			$scope.addApplicationPage = function(){
				$dialog.dialog({
					templateUrl: '/js/templates/dialogs/create_application_page.ng',
					controller: create_application_page_controller,
					resolve: {
						project: function(){
							return $scope.project;
						}
					}
				}).open();
			};

			$scope.openPage = function(page){
				$scope.activePage = page;
			};

			$scope.addPredefinedDataSource = function(){
				$dialog.dialog({
					templateUrl: '/js/templates/dialogs/create_predefined_data_source.ng',
					controller: create_predefined_data_source_controller,
					resolve: {
						project: function(){
							return $scope.project;
						}
					}
				}).open();
			};
		}]);
});