define(["angular", "app"], function(angular, app){
	app.directive("mkAppBarComponent", function(){
		return {
			restrict: "E",
			compile: function compile(template) {
			/*	template.addClass("app-bar-component");*/

				return function (scope, element) {
					var preventDefault = function(e){
							e.stopPropagation();
							e.preventDefault();

							return false;
						},
						onDragEnter = function(e){
							e.currentTarget.classList.add("drag-enter");

							return preventDefault(e);
						},
						onDragOver = function(e){
							e.dataTransfer.dropEffect = 'move';

							e.stopPropagation();
							e.preventDefault();

							return false;
						},
						onDragLeave = function(e){
							e.currentTarget.classList.remove("drag-enter");

							return preventDefault(e);
						},
						onDrop = function(e){
							var target = angular.element(e.currentTarget);

							scope.inactive = true;

							target.addClass("initialized");
							target.removeClass("drag-enter");

							target.unbind("dragenter", onDragEnter);
							target.unbind("dragover", onDragOver);
							target.unbind("dragleave", onDragLeave);
							target.unbind("drop", onDrop);

							return preventDefault(e);
						}, onParentDragEnter = function(e, args){
							if(!scope.inactive && args.meta && args.meta.type === "mk-app-bar-component"){
								element.addClass("drop-target");
							}
						}, onParentDragLeave = function(e, args){
							if(!scope.inactive && args.meta && args.meta.type === "mk-app-bar-component"){
								element.removeClass("drop-target");
							}
						};

					// let's subscribe for parent events
					scope.$on("drag:enter", onParentDragEnter);

					scope.$on("drag:leave", onParentDragLeave);

					element.bind("dragenter", onDragEnter);
					element.bind("dragover", onDragOver);
					element.bind("dragleave", onDragLeave);
					element.bind("drop", onDrop);

					scope.component.styles.background_color.value = "#000";
				};
			}
		};
	});
});