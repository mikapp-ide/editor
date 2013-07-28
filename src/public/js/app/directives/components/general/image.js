define(function(){
	'use strict';

	return function () {
		return {
			restrict: 'E',

			link: function(scope, element){
				element.text('X');
				/*scope.defineStyle('background_image', 'file', 'Image', true);*/
			}
		};
	};
});