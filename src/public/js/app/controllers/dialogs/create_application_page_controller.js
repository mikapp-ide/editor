define(["angular", "app"], function (angular, app) {
	"use strict";

	var CreateApplicationPageController = function($rootScope, $scope, $http, dialog, config, project){
		var save = function(model){
			$scope.project.pages.push({
				name: model.name,
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
				},{
					meta:{
						type: "mk-app-bar-component"
					},
					placeholder: true
				}]
			});
		};

		$scope.project = project;

		$scope.close = function(result, model){
			if(result === "save"){
				save(model);
			}
			dialog.close();
		};

		$scope.title = "Create Page";

		$scope.model = {
			name: "New Page"
		};

		/*$scope.message = "This is the content of the message box";*/
		$scope.buttons = [{
			result:'cancel',
			label: 'Cancel'
		}, {
			result:'save',
			label: 'Save',
			cssClass: 'btn-primary'
		}];
	};

	return CreateApplicationPageController;
});