define(['angular', 'app', 'app/controllers/dialogs/create_project_controller'], function (angular, app, create_project_controller) {
	'use strict';

	return app.controller('ProjectsController', ['$rootScope', '$scope', '$location', '$dialog', '$http', 'config', function ($rootScope, $scope, $location, $dialog, $http, config) {

		$rootScope.$on('show:loading', function(e, args){
			/*debugger;
			alert('loading');*/
		});

		$scope.createProject = function(){
			$dialog.dialog({
				templateUrl: 'js/templates/dialogs/create_project.ng',
				controller: create_project_controller
			}).open();
		};

		$http.defaults.headers.common['access-token']='user_token';
		$http.get(config.services.data + '/projects').success(function(data){
			$scope.projects = data.map(function(project){
				return {
					id: project._id,
					name: project.name
				};
			});
		});
	}]);
});