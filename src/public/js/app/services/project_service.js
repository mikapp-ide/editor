define(["angular", "app"], function(angular, app){

	app.factory("project_service", ["$http", "config", function($http, config){
		return {

			_project: null,

			loadProject: function(id){
				$http.defaults.headers.common["access-token"]="user_token";

				return $http.get(config.services.data + "/project/" + id).then(function(data){
					this._project = {
						id: data._id,
						name: data.name,

						pages:[{
							name: "Welcome Page",
							components: [{
								meta:{
									type: "mk-app-bar-component"
								},
								placeholder: true
							},{
								meta:{
									type: "mk-rectangle-component",
									support:{
										resizing: false,
										children: true
									}
								},
								classes: "content-area"

							/*	children:[{
									meta:{
										type: "mk-grid-view-component"
									}
								}]*/
							},{
								meta:{
									type: "mk-app-bar-component"
								},
								placeholder: true
							}]
						}],

						sources: {
							predefined:[{
								id: 0,
								name: "Pictures",

								fields:[{
									name: "Name",
									type: "string"
								}]
							}]
						}
					};

					return this._project;
				}.bind(this));
			},

			getCurrentProject: function(){
				return this._project;
			}
		};
	}]);
});