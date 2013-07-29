define(
	['angular', 'underscore', 'app/models/component_type'],
	function(angular, _, ComponentType) {
		'use strict';

		// TODO(azasypkin): Remove that constant data with component service
		// call.
		var componentTypes = [
			new ComponentType(
				'mk-appbar',
				'Application Bar',
				'general'
			),
			new ComponentType(
				'mk-rectangle',
				'Rectangle',
				'general',
				['color', 'background-color', 'content-orientation',
					'font-size'],
				{
					resizing: true,
					children: true
				}
			),
			new ComponentType(
				'mk-button',
				'Button',
				'general',
				['color', 'background-color'],
				{
					resizing: true
				}
			),
			new ComponentType(
				'mk-text',
				'Text',
				'general',
				['color', 'background-color', 'font-size']
			),
			new ComponentType(
				'mk-gridview',
				'GridView',
				'lists',
				{
					resizing: true
				}
			)
		];

		// group components by groupId
		var groupedComponentTypes = _.groupBy(componentTypes, function(type) {
			return type.groupId;
		});

		var componentGroups = [{
			id: 'general',
			title: 'General',
			componentTypes: groupedComponentTypes.general
		}, {
			id: 'lists',
			title: 'Lists',
			componentTypes: groupedComponentTypes.lists
		}];

		/**
		 * Types of component events.
		 * @enum {string}
		 */
		var ComponentEvent = {
			CLICK: 'click',
			DOUBLE_CLICK: 'double_click',
			HOVER: 'hover'
		};

		/**
		 * Types of component event actions.
		 * @enum {string}
		 */
		var ComponentEventAction = {
			/**
			 * Navigates to the particular page.
			 */
			NAVIGATE: 'navigate',
			DOUBLE_CLICK: 'double_click',
			HOVER: 'hover'
		};

		/**
		 * Component available style mappings.
		 * @type {Object.<string, {
		 *     label: string,
		 *     type: mikapp.editor.models.ComponentType.EditorType,
		 *     css: (string|undefined),
		 *     values: (Array.<{id: string, label: string}>|undefined)
		 * }}
		 */
		var styleToCssMapping = {
			'color': {
				label: 'Color',
				type: ComponentType.EditorType.COLOR
			},
			'background-color': {
				label: 'Background color',
				type: ComponentType.EditorType.COLOR
			},
			'font-size': {
				label: 'Font size, px',
				type: ComponentType.EditorType.NUMBER
			},
			'content-orientation': {
				label: 'Content Orientation',
				type: ComponentType.EditorType.SELECT,
				css: '-webkit-flex-direction',
				options: [{
					value: 'row',
					label: 'Row'
				}, {
					value: 'column',
					label: 'Column'
				}]
			}
		};

		/**
		 * Component service class.
		 * @name mikapp.editor.services.ComponentService
		 * @constructor
		 */
		var ComponentService = function() {
		};

		/**
		 * Gets all component groups including type for every component.
		 * @returns {Array.<{id: string, label: string, components:
		 *     !Array.<mikapp.editor.models.ComponentType>}>}
		 */
		ComponentService.prototype.getGroups = function() {
			return componentGroups;
		};

		/**
		 * Gets component group by its id.
		 * @param {string} id Group id to get.
		 * @returns {{id: string, label: string, components:
		 *     !Array.<mikapp.editor.models.ComponentType>}}
		 */
		ComponentService.prototype.getGroup = function(id) {
			var group = _.find(componentGroups, function(group) {
				return group.id === id;
			});
			return group || null;
		};

		/**
		 * Gets component type its id.
		 * @param {string} id Component type id to get.
		 * @returns {mikapp.editor.models.ComponentType}
		 */
		ComponentService.prototype.getType = function(id) {
			var length = componentTypes.length,
				item,
				i;

			// TODO(azasypkin): We should initialize map\hash once we
			// receive component types from the server to avoid
			// iterations through entire list every time we need
			// component type.
			for (i = 0; i < length; i++) {
				item = componentTypes[i];

				if (item.id === id) {
					return item;
				}
			}

			return null;
		};

		/**
		 * Gets component style config (what properties are configurable).
		 * @param {string} type Component type.
		 * @returns {*}
		 */
		ComponentService.prototype.getStyleConfig = function(type) {
			if (styleToCssMapping.hasOwnProperty(type)) {
				return styleToCssMapping[type];
			}
			return null;
		};

		return ComponentService;
	}
);