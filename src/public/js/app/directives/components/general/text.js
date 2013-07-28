define(function(){
	'use strict';

	return function(){
		return {
			restrict: 'E',

			template: '<p contenteditable="true">{{component.properties.text.value}}</p>',

			replace: true,

			link: function(scope){
				/*scope.defineProperty('text', 'text-long', 'Text', true, 'Sample Text');*/
			}
		};
	};
});