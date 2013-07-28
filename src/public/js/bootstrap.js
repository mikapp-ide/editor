require.config({
	baseUrl: '/js',
	paths: {
		angular: 'libs/angular',
		'ui-bootstrap': 'libs/ui-bootstrap.min',
		underscore: 'libs/lodash.min',
		rText: 'libs/requirejs/plugins/text',
		ri18n: 'libs/requirejs/plugins/i18n'
	},
	// uncomment to disable caching
	urlArgs: 'bust=' +  (new Date()).getTime(),

	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

require(['angular', 'app', 'app/services/registration',
	'app/controllers/registration',
	'app/directives/registration'
], function (angular, app) {
	'use strict';

	app.config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);

		// setting routes
		$routeProvider
			.when('/', {
				templateUrl: '/js/templates/pages/projects.ng',
				controller: 'ProjectsController'
			})
			.when('/project/:id', {
				templateUrl: '/js/templates/pages/project_details.ng',
				controller: 'ProjectDetailsController'
			})
			.otherwise({redirectTo: '/projects'});
	}]);

	angular.bootstrap(document, ['mikapp']);
});

