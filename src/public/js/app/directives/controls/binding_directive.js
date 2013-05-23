define(['angular', 'app'], function(angular, app){
	'use strict';

	app.directive('mkBindingControl', ['$compile', function($compile){
		return {
			restrict: 'E',

			scope: {
				controlModel: '=model',
				fields: '=',
				dataFields:'=data'
			},

			template:   '<div class="data-binding-control">' +
							'<div ng-repeat="binding in controlModel" class="composite-field">'+
								'<select class="bind-target" ng-model="binding.field" ng-options="field.id as field.label for field in fields"></select>' +
								'<select class="bind-source" ng-model="binding.data_field" ng-options="field.id as field.label for field in dataFields"></select>' +
							'</div>' +
							'<a href="#" ng-click="addNewBinding()">+ Add new binding</a>' +
						'</div>',

			replace: true,

			link: function (scope, element, attrs) {
				scope.addNewBinding = function(){
					scope.controlModel.push({
						field: -1,
						data_field: -1
					});
				};
				/*element.bind('change', function(e){
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function(){
							scope.inputModel = 'url(' + e.target.result + ')';
						});
					};
					reader.readAsDataURL(e.currentTarget.files[0]);
				});*/
			}
		};
	}]);
});