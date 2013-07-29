define(['app/models/project'],
	function(Project){
		'use strict';

		/**
		 * Project service class.
		 * @name mikapp.editor.services.ProjectService
		 * @param {!angular.$http} $http Angular http service.
		 * @param {!angular.$q} $q Angular promise service.
		 * @param {!Object} config Application config.
		 * @param {!mikapp.editor.services.ComponentService} componentService
		 * @constructor
		 */
		var ProjectService = function($http, $q, config, componentService) {

			this.$http_ = $http;
			this.$q_ = $q;
			this.config_ = config;

			/**
			 * Component service instance.
			 * @type {mikapp.editor.services.ComponentService}
			 * @private
			 */
			this.componentService_ = componentService;


			/**
			 * Currently selected project.
			 * @type {mikapp.editor.models.Project}
			 * @private
			 */
			this.project_ = null;
		};

		/**
		 * Enumerates all projects.
		 * @returns {!angular.$q.<Array.<mikapp.editor.models.Project>>}
		 */
		ProjectService.prototype.list = function() {
			var componentService = this.componentService_;
			return this.makeRequest_('projects').then(function(data) {
				return data && data.length > 0 ? data.map(function(project) {
					return Project.deserialize(project, componentService);
				}) : [];
			});
		};

		/**
		 * Creates new project.
		 * @param {string} name Project name.
		 * @param {string} description Project description.
		 * @returns {!angular.$q.<mikapp.editor.models.Project>}
		 */
		ProjectService.prototype.create = function(name, description) {
			return this.makeRequest_('project', 'POST', {
				id: '',
				name: name,
				description: description
			}).then(function(data) {
				return data ? Project.deserialize(data) : null;
			});
		};

		/**
		 * Gets project by id.
		 * @param {string} id Project id.
		 * @returns {angular.$q.<mikapp.editor.models.Project>}
		 */
		ProjectService.prototype.get = function(id) {
			var componentService = this.componentService_;
			return this.makeRequest_('project/' + id).then(function(data){
				this._project = data ?
					Project.deserialize(data, componentService) : null;

				return this._project;
			}.bind(this));
		};

		/**
		 * Gets current project.
		 * @returns {mikapp.editor.models.Project}
		 */
		ProjectService.prototype.getCurrent = function() {
			return this.project_;
		};

		/**
		 * Returns full service URL.
		 * @param {string} path
		 * @private
		 */
		ProjectService.prototype.getUrl_ = function(path){
			return this.config_.services.data + '/' + path;
		};

		/**
		 * Makes actual HTTP request.
		 * @param {string} path Path to request.
		 * @param {string=} method HTTP metod to use.
		 * @param {*=} data Data to path along with request.
		 * @returns {!angular.$q}
		 * @private
		 */
		ProjectService.prototype.makeRequest_ = function(path, method, data) {
			this.$http_.defaults.headers.common['access-token'] =
				'user_token';

			// TODO(azasypkin) Remove as soon as server is ready.
			if (this.config_.debug) {
				var deferred = this.$q_.defer();

				deferred.resolve(path === 'projects' ?
					[this.getPredefinedProject_()] :
					this.getPredefinedProject_());

				return deferred.promise;
			}
			return this.$http_[(method || 'GET').toLowerCase()](
				this.getUrl_(path), data).then(function(response) {
					return response.data;
				});
		};

		/**
		 * Temporal method that returns mock server data.
		 * @returns {{id: string, title: string, stylesheet: {id: string, rules:
		 *      Array}, pages: Array}}
		 * @private
		 */
		ProjectService.prototype.getPredefinedProject_ = function() {
			return {
				id: 'az-1',
				title: 'Hello World',
				stylesheet: {
					id: 'az-1-stylesheet',
					rules: [{
						selector: '.mk-rectangle-1',
						styles: {
							'background-color': 'red',
							'font': '25px Arial'
						}
					}, {
						selector: '.top-appbar-1',
						styles: {
							'background-color': 'blue'
						}
					}, {
						selector: '.mk-rectangle-component',
						styles: {
							'background-color': 'red'
						}
					}, {
						selector: '.az-mk-button-1',
						styles: {
							'background-color': 'green'
						}
					}]
				},
				pages: [{
					id: 'welcome-page',
					title: 'Welcome Page',
					components: [{
						typeId: 'mk-rectangle',
						children: [{
							typeId: 'mk-button',
							cssClass: 'az-mk-button-1'
						}]
					}]
				}]
			};
		};

		/*sources: {
			predefined:[{
				id: 0,
				name: 'Pictures',

				fields:[{
					name: 'Name',
					type: 'string'
				}]
			}]
		}*/

		return ['$http', '$q', 'configuration', 'ComponentService',
			ProjectService];
	}
);