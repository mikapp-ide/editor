define(
	['app/models/application_page', 'app/models/component',
		'app/models/component_type'],
	function(ApplicationPage, Component, ComponentType) {
		'use strict';

		describe('mikapp.editor.models.ApplicationPage', function() {
			it('should be instantiated correctly.', function() {
				var id = 'type-1',
					title = 'component-title',
					type = new ComponentType('type-1', 'type-title', 'general'),
					components = [new Component(type), new Component(type)],
					applicationPage = new ApplicationPage(id, title,
						components);

				expect(applicationPage.id).toEqual(id);
				expect(applicationPage.title).toEqual(title);
				expect(applicationPage.components.length).
					toEqual(components.length);

				applicationPage = new ApplicationPage(id, title);

				expect(applicationPage.id).toEqual(id);
				expect(applicationPage.title).toEqual(title);
				expect(applicationPage.components).toBeNull();
			});

			it('should be deserialized correctly.', function() {
				var serverData = {
						id: 'page-1',
						title: 'page-1-title',
						components: [{
							typeId: 'type-1'
						}]
					},
					type = new ComponentType('type-1', 'type-title',
						'general'),
					typeProvider = {
						getType: function() {
							return type;
						}
					},
					deserializedApplicationPage = ApplicationPage.deserialize(
						serverData, typeProvider);

				expect(deserializedApplicationPage).toBeDefined();
				expect(deserializedApplicationPage.id).toEqual(serverData.id);
				expect(deserializedApplicationPage.title).toEqual(
					serverData.title);
				expect(deserializedApplicationPage.components.length).
					toEqual(serverData.components.length);
				expect(deserializedApplicationPage.components[0] instanceof
					Component).toBe(true);

				serverData = {
					id: 'page-1',
					title: 'page-1-title'
				};

				deserializedApplicationPage = ApplicationPage.deserialize(
					serverData, typeProvider);

				expect(deserializedApplicationPage).toBeDefined();
				expect(deserializedApplicationPage.id).toEqual(serverData.id);
				expect(deserializedApplicationPage.title).toEqual(
					serverData.title);
				expect(deserializedApplicationPage.components).toBeNull();
			});
		});
	}
);