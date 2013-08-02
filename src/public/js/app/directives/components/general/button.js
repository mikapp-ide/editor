define(function(){
	'use strict';

	return function(){
		return {
			restrict: 'E',

			template: '<button contenteditable="true" class="btn-primary">' +
				'{{component.properties.text.value}}</button>',

			replace: true
		};
	};
});