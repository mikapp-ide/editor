define(
	['app/models/component_type'],
	function(ComponentType) {
		'use strict';

		describe('mikapp.editor.models.ComponentType', function() {
			it('should be instantiated correctly.', function() {
				var id = 'type-1',
					title = 'component-title',
					groupId = 'general',
					styles = ['color', 'font'],
					supports = {
						resizing: true
					},
					componentType = new ComponentType(id, title, groupId,
						styles, supports);

				expect(componentType.id).toEqual(id);
				expect(componentType.title).toEqual(title);
				expect(componentType.groupId).toEqual(groupId);
				expect(componentType.styles).toEqual(styles);
				expect(componentType.supports).toEqual(supports);

				componentType = new ComponentType(id, title, groupId, styles);

				expect(componentType.id).toEqual(id);
				expect(componentType.title).toEqual(title);
				expect(componentType.groupId).toEqual(groupId);
				expect(componentType.styles).toEqual(styles);
				expect(componentType.supports).toBeNull();

				componentType = new ComponentType(id, title, groupId);

				expect(componentType.id).toEqual(id);
				expect(componentType.title).toEqual(title);
				expect(componentType.groupId).toEqual(groupId);
				expect(componentType.styles).toBeNull();
				expect(componentType.supports).toBeNull();
			});

			it('supportResizing() should work correctly.',
				function() {
					var supports = {
							resizing: true
						},
						componentType = new ComponentType('type-1',
							'component-title', 'general', ['color', 'font'],
							supports);

					expect(componentType.supportResizing()).
						toEqual(supports.resizing);

					supports = {
						resizing: false
					};
					componentType = new ComponentType('type-1',
						'component-title', 'general', ['color', 'font'],
						supports);
					expect(componentType.supportResizing()).
						toEqual(supports.resizing);

					supports = {
						children: true
					};
					componentType = new ComponentType('type-1',
						'component-title', 'general', ['color', 'font'],
						supports);
					expect(componentType.supportResizing()).
						toBe(false);

					componentType = new ComponentType('type-1',
						'component-title', 'general', ['color', 'font']);

					expect(componentType.supportResizing()).
						toBe(false);
				}
			);
		});
	}
);