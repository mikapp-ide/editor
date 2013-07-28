define(['angular'], function(angular) {
	'use strict';

	return ['$scope', '$dialog', '$routeParams', 'configuration',
		'ComponentService', 'ProjectService',
		function ($scope, $dialog, $routeParams, config, componentService,
			projectService) {

			/*$scope.$on('component-selected', function(event, parameters) {
				var component = parameters;

				$scope.styles = component.styles.map(function(styleKey) {
					var styleConfig = componentService.getStyleConfig(styleKey);

					// here we should check whether component has dedicated css
					// class and get values from there
					var values = $scope.project.styleSheet.rules;

					return styleConfig;
				});
			});*/

			projectService.get($routeParams.id).then(function(project) {
				$scope.project = project;

				$scope.activePage = $scope.project.pages[0];

				$scope.downloadLink = config.services.compile +
					'/api/compile/' + $scope.project.id;
			});

			$scope.toolBox = componentService.getGroups();

			/*$scope.showJSON = function(){
				//window.console.log(angular.toJson($scope.project));

				$scope.project.userClasses.push({
					selector: '.mk-rectangle-component',
					styles: {
						'border': '10px solid blue'
					}
				});
			};*/

		/*	$scope.addApplicationPage = function() {
				$dialog.dialog({
					templateUrl: config.templates.dialogs +
						'create_application_page.ng',
					controller: 'CreatePageController',
					resolve: {
						project: function(){
							return $scope.project;
						}
					}
				}).open();
			};*/

		/*	$scope.openPage = function(page) {
				$scope.activePage = page;
			};*/

		/*	$scope.addPredefinedDataSource = function() {
				$dialog.dialog({
					templateUrl: config.templates.dialogs +
						'create_predefined_data_source.ng',
					controller: 'CreateDataSourceController',
					resolve: {
						project: function(){
							return $scope.project;
						}
					}
				}).open();
			};*/
		}
	];
});