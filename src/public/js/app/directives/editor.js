define(function() {
	'use strict';

	return  [function(){
		return function(scope, element, attrs){
			element.attr('draggable', true);

			attrs.$observe('mkDraggable', function(value){
				scope.model = scope.$eval(value);
			});

			scope.$on('drag-start', function(e, data) {
				element.addClass('drag-in-progress');

				scope.componentTypeToDrag = data;
			});

			scope.$on('drag-end', function() {
				element.removeClass('drag-in-progress');

				scope.componentTypeToDrag = null;
			});

			element.bind('dragenter', function(e){
				element.addClass('drag-enter');

				e.stopPropagation();
			}, false);

			element.bind('dragleave', function(e){
				element.removeClass('drag-enter');

				e.stopPropagation();
			}, false);
		};
	}];
});