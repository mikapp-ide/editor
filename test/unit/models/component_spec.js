define(
	['app/models/component', 'app/models/component_type'],
	function(Component, ComponentType) {
		'use strict';

		describe('mikapp.editor.models.Component', function() {
			it('should be instantiated correctly.', function() {
				var type = new ComponentType('type-1', 'type-title', 'general'),
					children = [new Component(type)],
					cssClass = 'component-class',
					component = new Component(type, children, cssClass);

				expect(component.type).toEqual(type);
				expect(component.children).toEqual(children);
				expect(component.cssClass).toEqual(cssClass);

				component = new Component(type, children);

				expect(component.type).toEqual(type);
				expect(component.children).toEqual(children);
				expect(component.cssClass).toBeNull();

				component = new Component(type);

				expect(component.type).toEqual(type);
				expect(component.children).toBeNull();
				expect(component.cssClass).toBeNull();
			});

			it('should be deserialized correctly', function() {
				var serverData = {
						typeId: 'type-1',
						children: [{
							typeId: 'type-1'
						}],
						cssClass: 'component-class'
					},
					type = new ComponentType('type-1', 'type-title',
						'general'),
					typeProvider = {
						getType: function() {
							return type;
						}
					},
					deserializedComponent = Component.deserialize(serverData,
						typeProvider);

				expect(deserializedComponent).toBeDefined();
				expect(deserializedComponent.type).toEqual(type);
				expect(deserializedComponent.children.length).toEqual(
					serverData.children.length);
				expect(deserializedComponent.children[0] instanceof Component).
					toBe(true);
				expect(deserializedComponent.cssClass).toEqual(
					serverData.cssClass);

				serverData = {
					typeId: 'type-1',
					children: [{
						typeId: 'type-1'
					}]
				};
				deserializedComponent = Component.deserialize(serverData,
					typeProvider);

				expect(deserializedComponent).toBeDefined();
				expect(deserializedComponent.type).toEqual(type);
				expect(deserializedComponent.children.length).toEqual(
					serverData.children.length);
				expect(deserializedComponent.children[0] instanceof Component).
					toBe(true);
				expect(deserializedComponent.cssClass).toBeNull();

				serverData = {
					typeId: 'type-1'
				};
				deserializedComponent = Component.deserialize(serverData,
					typeProvider);

				expect(deserializedComponent).toBeDefined();
				expect(deserializedComponent.type).toEqual(type);
				expect(deserializedComponent.children).toBeNull();
				expect(deserializedComponent.cssClass).toBeNull();
			});
		});
	}
);