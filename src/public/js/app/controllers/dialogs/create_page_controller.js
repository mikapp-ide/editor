define(['angular', 'app'], function (angular, app) {
	'use strict';

	return ['$scope', 'dialog', 'project', function($scope, dialog, project){
		var save = function(model){
			$scope.project.pages.push({
				name: model.name,
				components: [{
					type: 'mk-appbar',
					placeholder: true
				},{
					type: 'mk-rectangle',
					support:{
						resizing: false,
						children: true
					},
					classes: 'content-area'
				},{
					type: 'mk-appbar',
					placeholder: true
				}]
			});
		};

		$scope.project = project;

		$scope.close = function(result, model){
			if(result === 'save'){
				save(model);
			}
			dialog.close();
		};

		$scope.title = 'Create Page';

		$scope.model = {
			name: 'New Page'
		};

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