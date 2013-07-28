define(['app/models/stylesheet_rule'], function(Stylesheet) {
	'use strict';

	/**
	 * Stylesheet model.
	 * @name mikapp.editor.models.Stylesheet
	 * @param {string} id Stylesheet id.
	 * @param {string=} opt_media Stylesheet media constraint.
	 * @param {Array.<mikapp.editor.models.StylesheetRule>=} opt_rules
	 *      Stylesheet CSS rules.
	 * @constructor
	 */
	var Model = function(id, opt_media, opt_rules) {
		/**
		 * Stylesheet id.
		 * @type {string}
		 */
		this.id = id;

		/**
		 * Stylesheet media constraint.
		 * @type {string}
		 */
		this.media = opt_media || 'screen';

		/**
		 * Stylesheet css rules.
		 * @type {Array.<mikapp.editor.models.StylesheetRule>}
		 */
		this.rules = opt_rules || null;
	};

	/**
	 * Returns rule by specified selector or null if nothing found.
	 * @param {string} selector Selector to find rule by.
	 */
	Model.prototype.getRule = function(selector) {
		var foundRule = null,
			ruleCount = this.rules ? this.rules.length : 0,
			rule,
			i;

		for (i = 0; i < ruleCount; i++) {
			rule = this.rules[i];

			if (rule.selector === selector) {
				foundRule = rule;
				break;
			}
		}

		return foundRule;
	};

	/**
	 * Deseriazes model instance from raw server data.
	 * @param {!Object} data
	 * @returns {mikapp.editor.models.Stylesheet}
	 */
	Model.deserialize = function(data) {
		return new Model(data.id, data.media, data.rules ?
			data.rules.map(function(rule) {
				return Stylesheet.deserialize(rule);
			}) : null);
	};

	return Model;
});