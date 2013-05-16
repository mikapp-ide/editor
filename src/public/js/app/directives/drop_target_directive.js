define(["angular", "app"], function(angular, app){
	app.directive("mkDropTarget", ["$rootScope", function($rootScope){
		return {

			link: function(scope, element){

				element.bind("dragenter", function(e){
					var contentArea;

					scope.$broadcast("drag:enter", {
						meta: $rootScope.draggingComponent
					});

					element.addClass("drag-enter");

					e.stopPropagation();
				}, false);

				element.bind("dragleave", function(e){
					var contentArea;

					scope.$broadcast("drag:leave", {
						meta: $rootScope.draggingComponent
					});

					element.removeClass("drag-enter");

					e.stopPropagation();
				}, false);
			}
		};
	}]);
});