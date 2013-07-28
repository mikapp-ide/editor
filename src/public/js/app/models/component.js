define(function() {
	'use strict';

	/**
	 * Component model.
	 * @name mikapp.editor.models.Component
	 * @param {!mikapp.editor.models.ComponentType} type Component type.
	 * @param {Array.<mikapp.editor.models.Component>=} opt_children Component
	 *      children array.
	 * @param {string=} opt_cssClass Component dedicated CSS class.
	 * @constructor
	 */
	var Model = function(type, opt_children, opt_cssClass) {
		/**
		 * Component type.
		 * @type {!mikapp.editor.models.ComponentType}
		 */
		this.type = type;

		/**
		 * Component children array.
		 * @type {Array.<mikapp.editor.models.Component>}
		 */
		this.children = opt_children || null;

		/**
		 * Component CSS class.
		 * @type {?string}
		 */
		this.cssClass = opt_cssClass || null;

		// TODO(azasypkin): Here we can pass different supports and styles to
		// override default one defined inside component type.
	};

	/**
	 * Deseriazes model instance from raw server data.
	 * @param {!Object} data Raw server data.
	 * @param {!{getType: function(string): mikapp.editor.models.ComponentType}}
	 *      typeProvider Component type provider.
	 * @returns {mikapp.editor.models.Component}
	 */
	Model.deserialize = function(data, typeProvider) {
		return new Model(typeProvider.getType(data.typeId), data.children &&
			data.children.map(function(component) {
				return Model.deserialize(component, typeProvider);
			}), data.cssClass);
	};

	return Model;
});