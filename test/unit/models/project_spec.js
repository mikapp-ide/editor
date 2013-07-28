define(
	['app/models/project', 'app/models/stylesheet',
		'app/models/application_page', 'app/models/component_type'],
	function(Project, Stylesheet, ApplicationPage, ComponentType) {
		'use strict';

		describe('mikapp.editor.models.Project', function() {
			it('should be instantiated correctly.', function() {
				var id = 'project-1',
					title = 'project-title',
					stylesheetId = id + '-stylesheet',
					pageId = id + '-page',
					stylesheet = new Stylesheet(stylesheetId),
					applicationPages = [
						new ApplicationPage(pageId, 'page-title')],
					project = new Project(id, title, stylesheet,
						applicationPages);

				expect(project.id).toEqual(id);
				expect(project.title).toEqual(title);
				expect(project.stylesheet instanceof Stylesheet).toBe(true);
				expect(project.pages.length).toEqual(1);
				expect(project.pages[0] instanceof ApplicationPage).toBe(true);
			});

			it('should be deserialized correctly.', function() {
				var serverData = {
						id: 'az-1',
						title: 'Hello World',
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
							title: 'Welcome Page'
						}]
					},
					typeProvider = {
						getType: function(id) {
							return new ComponentType(id, 'type-title',
								'general');
						}
					},
					deserializedProject = Project.deserialize(
						serverData, typeProvider);

				expect(deserializedProject).toBeDefined();
				expect(deserializedProject.id).toEqual(serverData.id);
				expect(deserializedProject.title).toEqual(
					serverData.title);
				expect(deserializedProject.stylesheet instanceof Stylesheet).
					toBe(true);
				expect(deserializedProject.stylesheet.id).
					toEqual(serverData.stylesheet.id);
				expect(deserializedProject.pages.length).toEqual(1);
				expect(deserializedProject.pages[0] instanceof ApplicationPage).
					toBe(true);
				expect(deserializedProject.pages[0].id).
					toEqual(serverData.pages[0].id);

				serverData = {
					id: 'az-1',
					title: 'Hello World',
					stylesheet: {
						id: 'az-1-stylesheet',
						rules: [{
							selector: '.mk-rectangle-1',
							styles: {
								'background-color': 'red',
								'font': '25px Arial'
							}
						}]
					}
				};
				deserializedProject = Project.deserialize(serverData,
					typeProvider);

				expect(deserializedProject).toBeDefined();
				expect(deserializedProject.id).toEqual(serverData.id);
				expect(deserializedProject.title).toEqual(
					serverData.title);
				expect(deserializedProject.stylesheet instanceof Stylesheet).
					toBe(true);
				expect(deserializedProject.stylesheet.id).
					toEqual(serverData.stylesheet.id);
				expect(deserializedProject.pages.length).toEqual(0);

				serverData = {
					id: 'az-1',
					title: 'Hello World'
				};
				deserializedProject = Project.deserialize(serverData,
					typeProvider);

				expect(deserializedProject).toBeDefined();
				expect(deserializedProject.id).toEqual(serverData.id);
				expect(deserializedProject.title).toEqual(
					serverData.title);
				expect(deserializedProject.stylesheet instanceof Stylesheet).
					toBe(true);
				expect(deserializedProject.stylesheet.id).
					toEqual(serverData.id + '-stylesheet');
				expect(deserializedProject.pages.length).toEqual(0);
			});
		});
	}
);