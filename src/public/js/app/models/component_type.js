define(function() {
	'use strict';

	/**
	 * Component model.
	 * @name mikapp.editor.models.ComponentType
	 * @param {string} id Component type id.
	 * @param {string} title Component type title.
	 * @param {string} groupId Component group id.
	 * @param {Array.<string>=} opt_styles Component supported CSS
	 *      styles.
	 * @param {Object.<string, boolean>=} opt_supports Component supported
	 *      features.
	 * @constructor
	 */
	var Model = function(id, title, groupId, opt_styles, opt_supports) {
		/**
		 * Component type id.
		 * @type {string}
		 */
		this.id = id;

		/**
		 * Component title.
		 * @type {string}
		 */
		this.title = title;

		/**
		 * Component group id.
		 * @type {string}
		 */
		this.groupId = groupId;

		/**
		 * Component styles.
		 * @type {Array.<string>}
		 */
		this.styles = opt_styles || null;

		/**
		 * Component supported features.
		 * @type {Object.<string, boolean>}
		 */
		this.supports = opt_supports || null;
	};

	/**
	 * Checks if current component supports resizing.
	 * @returns {boolean}
	 */
	Model.prototype.supportResizing = function() {
		return this.isFeatureSupported_('resizing');
	};

	/**
	 * Checks if current component supports children.
	 * @returns {boolean}
	 */
	Model.prototype.supportChildren = function() {
		return this.isFeatureSupported_('children');
	};

	/**
	 * Checks if current component supports specified feature.
	 * @param {string} feature Feature name to check.
	 * @returns {boolean}
	 * @private
	 */
	Model.prototype.isFeatureSupported_ = function(feature) {
		var featureSupported = this.supports && this.supports[feature];

		return typeof featureSupported === 'boolean' && featureSupported;
	};

	/**
	 * Types of style editor.
	 * @enum {string}
	 */
	Model.EditorType = {
		TEXT: 'text',
		NUMBER: 'number',
		SELECT: 'select',
		COLOR: 'color'
	};

	return Model;
});