var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/_spec\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

require.config({
	baseUrl: '/base/src/public/js',
	paths: {
		angular: 'libs/angular',
		'ui-bootstrap': 'libs/ui-bootstrap.min',
		underscore: 'libs/lodash.min',
		'angular-mocks': '../../../test/libs/angular-mocks',
		rText: 'libs/requirejs/plugins/text',
		ri18n: 'libs/requirejs/plugins/i18n'
	},

	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-mocks': {
			exports: 'angular-mocks',
			deps: ['angular']
		},
		'ui-bootstrap': {
			exports: 'ui-bootstrap',
			deps: ['angular']
		}
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});

require(['angular', 'app', 'app/services/registration',
	'app/controllers/registration',
	'app/directives/registration'
], function (angular, app) {
	'use strict';

	app.config(['$routeProvider', '$locationProvider',function ($routeProvider,
		$locationProvider) {

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
});