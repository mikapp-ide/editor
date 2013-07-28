define(function() {
	'use strict';

	return  ['$rootScope', function($rootScope){
		return function(scope, element, attrs){
			element.attr('draggable', true);

			attrs.$observe('mkDraggable', function(value){
				scope.model = scope.$eval(value);
			});

			element.bind('dragstart', function(e){
				if (e && e.dataTransfer) {
					e.dataTransfer.effectAllowed = 'move';
				}
				$rootScope.$broadcast('drag-start', scope.model);
			});

			element.bind('dragend', function(e){
				$rootScope.$broadcast('drag-end');
			});

			/*display_area.addEventListener('dragenter', function(e){
				e.currentTarget.classList.add('drop-target');
				//alert(e.dataTransfer.getData('text/plain'));
				e.stopPropagation();
			}, false);

			display_area.addEventListener('dragleave', function(e){
				e.currentTarget.classList.remove('drop-target');
				e.stopPropagation();
				//alert(e.dataTransfer.getData('text/plain'));
			}, false);

			display_area.querySelector('.app-bar').addEventListener('dragenter', function(e){
				e.currentTarget.classList.add('drop-target');
				e.stopPropagation();
				e.preventDefault();
				return false;
			}, false);

			display_area.querySelector('.app-bar').addEventListener('dragover', function(e){
				e.dataTransfer.dropEffect = 'move';
				e.stopPropagation();
				e.preventDefault();
				return false;
			}, false);

			display_area.querySelector('.app-bar').addEventListener('dragleave', function(e){
				e.currentTarget.classList.remove('drop-target');
				e.stopPropagation();
				e.preventDefault();
				return false;
			}, false);

			display_area.querySelector('.app-bar').addEventListener('drop', function(e){
				e.currentTarget.classList.add('activated');
				e.stopPropagation();
				e.preventDefault();
				return false;
			}, false);*/
		};
	}];
});