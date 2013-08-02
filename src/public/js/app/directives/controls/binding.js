define(function(){
	'use strict';

	return ['configuration', function(config){
		return {
			restrict: 'E',

			scope: {
				controlModel: '=model',
				fields: '=',
				dataFields:'=data'
			},

			templateUrl: config.templates.base + 'controls/binding.ng',

			replace: true,

			link: function (scope) {
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
	}];
});