define(function () {
	'use strict';

	return ['$rootScope', '$scope', '$dialog', 'ProjectService',
		function ($rootScope, $scope, $dialog, projectService) {

			/*$rootScope.$on('show:loading', function(e, args){
				debugger;
				alert('loading');
			});*/

			$scope.create = function(){
				$dialog.dialog({
					templateUrl: 'js/templates/dialogs/create_project.ng',
					controller: 'CreateProjectController'
				}).open();
			};

			projectService.list().then(function(projects){
				$scope.projects = projects;
			});
		}
	];
});