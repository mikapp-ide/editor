define(['angular', 'app'], function (angular, app) {
	

	var CreatePageController = function($rootScope, $scope, $http, dialog, config){
		var saveProject = function(project){
			$http.defaults.headers.common['access-token']='user_token';
			$rootScope.$broadcast('show:loading', [{
				field: 'one'
			}]);

			$http.post(config.services.data + '/project', {
				id: '',
				name: project.name,
				description: project.description
			}).success(function(e){
				dialog.close();
			});
		};

		$scope.close = function(result, model){
			if(result === 'cancel'){
				dialog.close();
			} else {
				saveProject(model);
			}
		};

		$scope.model = {
			name: 'New Project',
			description: 'This is my awesome project!'
		};

		$scope.title = 'Create new project';

		/*$scope.message = 'This is the content of the message box';*/
		$scope.buttons = [{
			result:'cancel',
			label: 'Cancel'
		}, {
			result:'save',
			label: 'Save',
			cssClass: 'btn-primary'
		}];
	};


	return CreatePageController;
});