define(function() {
	'use strict';

	/**
	 * Stylesheet rule model.
	 * @name mikapp.editor.models.StylesheetRule
	 * @param {string} selector Rule CSS selector.
	 * @param {!Object.<string, string>} styles Css styles
	 * @constructor
	 */
	var Model = function(selector, styles) {
		/**
		 * Stylesheet rule selector.
		 * @type {string}
		 */
		this.selector = selector;

		/**
		 * CSS styles.
		 * @type {!Object.<string, string>}
		 */
		this.styles = styles;
	};

	/**
	 * Deseriazes model instance from raw server data.
	 * @param {!Object} data
	 * @returns {mikapp.editor.models.StylesheetRule}
	 */
	Model.deserialize = function(data) {
		return new Model(data.selector, data.styles);
	};

	return Model;
});