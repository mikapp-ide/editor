define(function(){
	'use strict';

	return function () {
		return {
			restrict: 'E',

			link: function(scope, element){
				element.text('X');
			}
		};
	};
});