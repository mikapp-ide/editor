define(
	['angular', 'app/models/component_type'],
	function(angular, ComponentType) {
		'use strict';

		/**
		 * Fires once user makes any component active. Here we can update panes
		 * that depends on particular component (ex. styles)
		 * @param {!mikapp.editor.services.ComponentService} componentService
		 * @param {!angular.$event} event
		 * @param {!mikapp.editor.models.Component} component
		 */
		var onComponentSelected = function(componentService, event, component) {
			var componentClass = this.project.stylesheet.getRule(
				component.cssClass);

			this.component = component;

			if (component.type.styles) {
				this.panes.properties.styles = component.type.styles.map(
					function(styleKey) {
						var styleConfig = componentService.getStyleConfig(
							styleKey);

						return {
							id: styleKey,
							label: styleConfig.label,
							type: styleConfig.type,
							options: styleConfig.options,
							value: componentClass &&
								componentClass.styles.hasOwnProperty(styleKey) ?
								componentClass.styles[styleKey] : null
						};
					}
				);

				this.panes.properties.cssClass = {
					id: 'componentClass',
					label: 'Style Set',
					type: ComponentType.EditorType.SELECT,
					options: this.project.stylesheet.rules.map(function(rule) {
						return {
							value: rule.selector,
							label: rule.selector
						};
					}),
					value: component.cssClass
				};
			} else {
				this.panes.properties.styles = null;
				this.panes.properties.class = null;
			}
		};

		/**
		 * Handles case when active project is loaded.
		 * @param {mikapp.editor.models.Project} project
		 */
		var onProjectReceived = function(project) {
			this.project = project;

			this.panes.pages = project.pages;

			this.activePageIndex = 0;
		};

		return ['$scope', '$dialog', '$routeParams', 'configuration',
			'ComponentService', 'ProjectService',
			function ($scope, $dialog, $routeParams, config, componentService,
				projectService) {

				$scope.panes = {
					toolbox: componentService.getGroups(),
					properties: {
						class: null,
						styles: null,
						properties: null
					},
					pages: null
				};

				projectService.get($routeParams.id).then(
					onProjectReceived.bind($scope));

				$scope.$on('component-selected', onComponentSelected.bind(
					$scope, componentService));

			/*	$scope.$watch(function() {
					return $scope.panes.styles;
				}, function(newValue, oldValue) {
					if (!angular.equals(newValue, oldValue)) {
						// check whether component has css style
						// if yes, decouple this style, ideally we should check
						// if this class is used by any component, and if not -
						// remove it. Then we should generate hidden class
					}
				}, true);*/

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
	}
);