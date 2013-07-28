define(['angular', 'ui-bootstrap'], function (angular) {
	'use strict';

	// Mock data for the temp project.

	var app = angular.module('mikapp', ['ui.bootstrap']).
		constant('configuration', {
			services: {
				data: '/api',
				compile: 'http://mika.compile'
			},
			templates: {
				dialogs: '/js/templates/dialogs/',
				pages: '/js/templates/pages'
			},
			debug: true
		});

	return app;
});

