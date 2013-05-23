define(['angular', 'app'], function(angular, app){
	'use strict';

	app.directive('mkTextComponent', ['$compile', '$rootScope', function($compile, $rootScope){
		return {
			restrict: 'E',

			template: '<p contenteditable="true">{{component.properties.text.value}}</p>',

			replace: true,

			link: function(scope){
				/*scope.defineProperty('text', 'text-long', 'Text', true, 'Sample Text');*/
			}
		};
	}]);
});