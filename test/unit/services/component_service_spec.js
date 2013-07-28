define(['app/models/component_type', 'app', 'angular-mocks'],
	function(ComponentType) {
		"use strict";

		describe('mikapp.editor.services.ComponentService', function() {
			var componentService;

			beforeEach(module('mikapp'));

			beforeEach(function() {
				inject(function($injector) {
					componentService = $injector.get('ComponentService');
				});
			});

			it('getGroup should return group its id or null.',
				function() {
					var groupId = 'general',
						group = componentService.getGroup(groupId);

					expect(group).toBeDefined();
					expect(group.id).toEqual(groupId);
					expect(group.title).toBeDefined();
					expect(group.componentTypes.length).toBeGreaterThan(0);

					expect(componentService.getGroup('blah-blah')).toBeNull();
				}
			);

			it('getGroups should return group list and single group by its id.',
				function() {
					var groups = componentService.getGroups();

					expect(groups).toBeDefined();
					expect(groups.length).toBeGreaterThan(0);
					expect(groups.indexOf(componentService.getGroup('general'))).
						toBeGreaterThan(-1);
				}
			);

			it('getType should return component type by its id or null.',
				function() {
					var componentTypeId = 'mk-rectangle',
						componentType = componentService.getType(componentTypeId);

					expect(componentType).toBeDefined();
					expect(componentType instanceof ComponentType).toBe(true);
					expect(componentType.id).toEqual(componentTypeId);

					expect(componentService.getType('mk-blah-blah')).toBeNull();
				}
			);

			it('getStyle should return right correct CSS mapping.', function() {
				var colorStyleConfig = componentService.getStyleConfig('color'),
					fontSizeStyleConfig = componentService.getStyleConfig(
						'font-size'),
					unknownStyleConfig = componentService.getStyleConfig(
						'blah-blah');

				expect(colorStyleConfig).toBeDefined();
				expect(colorStyleConfig.label).toBeDefined();
				expect(colorStyleConfig.type).toEqual(
					ComponentType.EditorType.COLOR);

				expect(fontSizeStyleConfig).toBeDefined();
				expect(fontSizeStyleConfig.label).toBeDefined();
				expect(fontSizeStyleConfig.type).toEqual(
					ComponentType.EditorType.NUMBER);

				expect(unknownStyleConfig).toBeNull();
			});
		});
	}
);