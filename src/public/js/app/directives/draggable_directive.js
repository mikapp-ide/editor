define(['angular', 'app'], function(angular, app){
	app.directive('mkDraggable', ['$rootScope', function($rootScope){
		return {
			/*scope: {
				component: '=ngModel'
			},*/

			link: function(scope, element, attrs){
				element.attr('draggable', true);

				attrs.$observe('mkDraggable', function(value){
					scope.model = scope.$eval(value);
				});

				element.bind('dragstart', function(e){
					e.dataTransfer.effectAllowed = 'move';

					document.querySelector('.editor').classList.add('drag-in-progress');

					//as we need access to component that being dragged we need to store it somewhere globally
					$rootScope.draggingComponent = scope.model.meta;
				});

				element.bind('dragend', function(e){
					document.querySelector('.editor').classList.remove('drag-in-progress');

					if($rootScope.draggingComponent && $rootScope.draggingComponent.type === scope.model.meta.type){
						$rootScope.draggingComponent = null;
					}
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
			}
		};
	}]);
});