define(function () {
	'use strict';

	return ['$rootScope', '$scope','dialog', 'ProjectService',
		function($rootScope, $scope, dialog, projectService){

		var saveProject = function(project) {
			$rootScope.$broadcast('show:loading', [{
				field: 'one'
			}]);
			projectService.create(project.name, project.description).
				success(function(){
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
	}];
});