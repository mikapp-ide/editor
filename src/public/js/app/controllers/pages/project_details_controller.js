define(['angular'], function(angular) {
	'use strict';

	return ['$scope', '$dialog', '$routeParams', 'configuration',
		'ComponentService', 'ProjectService',
		function ($scope, $dialog, $routeParams, config, componentService,
			projectService) {

			$scope.panes = {
				toolbox: componentService.getGroups(),
				styles: null,
				pages: null
			};

			projectService.get($routeParams.id).then(function(project) {
				$scope.project = project;

				$scope.panes.pages = project.pages;
				$scope.activePage = $scope.project.pages[0];
			});

			$scope.$on('component-selected', function(event, component) {
				if (component.type.styles) {
					$scope.panes.styles = component.type.styles.map(
						function(styleKey) {
							var styleConfig = componentService.getStyleConfig(
								styleKey);

							return {
								id: styleKey,
								label: styleConfig.label,
								type: styleConfig.type,
								options: styleConfig.options
							};
						}
					);
				} else if ($scope.styles) {
					$scope.styles = null;
				}
			});

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