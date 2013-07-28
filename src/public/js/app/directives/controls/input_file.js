define(function(){
	'use strict';

	return function(){
		return {
			restrict: 'E',

			scope: {
				inputModel: '='
			},

			template: '<input type="file" />',

			replace: true,

			link: function (scope, element, attrs) {
				element.bind('change', function(e){
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function(){
							scope.inputModel = 'url(' + e.target.result + ')';
						});
					};
					reader.readAsDataURL(e.currentTarget.files[0]);
				});
			}
		};
	};
});