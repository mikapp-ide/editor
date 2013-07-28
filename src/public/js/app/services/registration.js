define([
	'app',
	'app/services/component_service',
	'app/services/project_service'
], function(app, ComponentService, ProjectService) {
	'use strict';

	app.
		service('ComponentService', ComponentService).
		service('ProjectService', ProjectService);
});