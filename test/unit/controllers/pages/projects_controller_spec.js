define(['app/models/project', 'app', 'angular-mocks'],
	function(Project) {
		"use strict";

		xdescribe('mikapp.editor.services.ProjectService', function() {
			var getProjectRawData = function(id) {
				return {
					id: id,
					title: 'Hello World_' + id,
					stylesheet: {
						id: 'az-1-stylesheet',
						rules: [{
							selector: '.mk-rectangle-1',
							styles: {
								'background-color': 'red',
								'font': '25px Arial'
							}
						}]
					},
					pages: [{
						id: 'welcome-page',
						title: 'Welcome Page',
						components: [{
							typeId: 'mk-appbar'
						}]
					}]
				};
			};

			var data = [getProjectRawData('az-1'), getProjectRawData('az-2')],
				projectService,
				config,
				$httpBackend;

			beforeEach(angular.mock.module('mikapp'));

			beforeEach(function() {
				angular.mock.module(function($provide) {
					$provide.constant('configuration', {
						services: {
							data: '/api'
						},
						templates: {
							dialogs: '/js/templates/dialogs/',
							pages: '/js/templates/pages'
						},
						debug: false
					});
				});

				angular.mock.inject(function($injector) {
					projectService = $injector.get('ProjectService');
					config = $injector.get('configuration');

					$httpBackend = $injector.get('$httpBackend');

					$httpBackend.when('GET', config.services.data +
						'/projects', '', function(headers) {
						return headers['access-token'] === 'user_token';
					}).	respond(data);

					$httpBackend.when('GET', config.services.data +
						'/project/' + data[0].id, '', function(headers) {
						return headers['access-token'] === 'user_token';
					}).	respond(data[0]);
				});
			});


			it('list() should return list of projects.', function() {
				$httpBackend.expectGET(config.services.data +
					'/projects');
				var projects;

				projectService.list().then(function(response) {
					projects = response;
				});

				$httpBackend.flush();

				waitsFor(function() {
					return !!projects;
				});

				runs(function() {
					expect(projects).toBeDefined();
					expect(projects.length).toEqual(data.length);

					projects.forEach(function(project, index) {
						expect(project instanceof Project).toBe(true);
						expect(project.id).toEqual(data[index].id);
					});

					$httpBackend.verifyNoOutstandingExpectation();
				});
			});

			it('get() should return project by id.', function() {
				$httpBackend.expectGET(config.services.data +
					'/project/' + data[0].id);
				var project;

				projectService.get(data[0].id).then(function(response) {
					project = response;
				});

				$httpBackend.flush();

				waitsFor(function() {
					return !!project;
				});

				runs(function() {
					expect(project).toBeDefined();
					expect(project instanceof Project).toBe(true);
					expect(project.id).toEqual(data[0].id);

					$httpBackend.verifyNoOutstandingExpectation();
				});
			});

		});
	}
);