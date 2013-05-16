require.config({
	baseUrl: "/js",
	paths: {
		angular: "libs/angular",
		"ui-bootstrap": "libs/ui-bootstrap-0.2.0",
		/*underscore: "libs/lodash.min",*/
		rText: "libs/requirejs/plugins/text",
		ri18n: "libs/requirejs/plugins/i18n"
	},
	// uncomment to disable caching
	urlArgs: "bust=" +  (new Date()).getTime(),

	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

require([
	"angular",
	"app",

	"app/controllers/pages/projects_controller",
	"app/controllers/pages/project_details_controller",

	"app/controllers/components/component_controller",
	"app/controllers/components/lists/grid_view_component_controller",

	"app/services/config_service",
	"app/services/component_service",
	"app/services/project_service",

	"app/directives/component_directive",
	"app/directives/draggable_directive",
	"app/directives/drop_target_directive",

	"app/directives/components/general/app_bar_directive",
	"app/directives/components/general/rectangle_directive",
	"app/directives/components/general/text_directive",
	"app/directives/components/general/image_directive",
	"app/directives/components/general/button_directive",

	"app/directives/components/lists/grid_view_directive",

	"app/directives/components/location/map_directive",

	"app/directives/controls/input_file_directive",
	"app/directives/controls/binding_directive"
], function (angular, app) {
	"use strict";

	app.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		// setting routes
		$routeProvider
			.when("/", {
				templateUrl: "/js/templates/pages/projects.ng",
				controller: "ProjectsController"
			})
			.when("/project/:id", {
				templateUrl: "/js/templates/pages/project_details.ng",
				controller: "ProjectDetailsController"
			})
			.otherwise({redirectTo: "/projects"});
	}]);

	angular.bootstrap(document, ['MIKA']);
});

