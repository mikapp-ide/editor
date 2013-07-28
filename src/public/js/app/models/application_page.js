define(['app/models/component'], function(Component) {
	'use strict';

	/**
	 * Application page model.
	 * @name mikapp.editor.models.ApplicationPage
	 * @param {string} id Page id.
	 * @param {string} title Page title.
	 * @param {Array.<mikapp.editor.models.Component>=} opt_components Page
	 *      component list.
	 * @constructor
	 */
	var Model = function(id, title, opt_components) {
		/**
		 * Page id.
		 * @type {string}
		 */
		this.id = id;

		/**
		 * Page title.
		 * @type {string}
		 */
		this.title = title;

		/**
		 * Application page components.
		 * @type {Array.<mikapp.editor.models.Component>}
		 */
		this.components = opt_components || null;
	};

	/**
	 * Deseriazes model instance from raw server data.
	 * @param {!Object} data
	 * @param {!{getType: function(string): mikapp.editor.models.ComponentType}}
	 *      typeProvider Component type provider.
	 * @returns {mikapp.editor.models.ApplicationPage}
	 */
	Model.deserialize = function(data, typeProvider) {
		return new Model(data.id, data.title, data.components ?
			data.components.map(function(component) {
				return Component.deserialize(component, typeProvider);
			}) : null);
	};

	return Model;
});