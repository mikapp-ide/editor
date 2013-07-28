define(['app/models/stylesheet', 'app/models/application_page'],
	function(Stylesheet, ApplicationPage) {
		'use strict';

		/**
		 * Project model.
		 * @name mikapp.editor.models.Project
		 * @param {string} id Project id.
		 * @param {string} title Project title.
		 * @param {!mikapp.editor.models.Stylesheet} stylesheet Project
		 *      stylesheet.
		 * @param {!Array.<mikapp.editor.models.ApplicationPage>} pages Project
		 *      application pages.
		 * @constructor
		 */
		var Model = function(id, title, stylesheet, pages) {
			/**
			 * Project id.
			 * @type {string}
			 */
			this.id = id;

			/**
			 * Project title.
			 * @type {string}
			 */
			this.title = title;

			/**
			 * Page components.
			 * @type {!mikapp.editor.models.Stylesheet}
			 */
			this.stylesheet = stylesheet;

			/**
			 * Application pages.
			 * @type {!Array.<mikapp.editor.models.ApplicationPage>}
			 */
			this.pages = pages;
		};

		/**
		 * Deseriazes model instance from raw server data.
		 * @param {!Object} data
		 * @param {!{getType: function(string):
		 *      mikapp.editor.models.ComponentType}} typeProvider Component type
		 *      provider.
		 * @returns {mikapp.editor.models.Project}
		 */
		Model.deserialize = function(data, typeProvider) {
			return new Model(data.id, data.title, data.stylesheet ?
				Stylesheet.deserialize(data.stylesheet) :
				new Stylesheet(data.id + '-stylesheet'), data.pages ?
				data.pages.map(function(page) {
					return ApplicationPage.deserialize(page, typeProvider);
				}) : []);
		};

		return Model;
	}
);