define(['angular', 'app'], function(angular, app){
	'use strict';

	app.directive('mkGridViewComponent', ['$compile', '$rootScope', function($compile, $rootScope){
		return {
			restrict: 'E',

			template: '<div>' +
				'<div class="grid-view-row">' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
				'</div>' +
				'<div class="grid-view-row">' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
					'<div mk-component="item_template_component" class="grid-view-item"></div>' +
				'</div>' +
				'</div>',

			replace: true,

			controller: 'GridViewComponentController',

			link: function(scope, element){
				var supportNestedComponent = function(component){
					return component
						&& component.type === 'mk-rectangle-component'
						|| component.type === 'mk-text-component'
						|| component.type === 'mk-image-component'
						|| component.type === 'mk-button-component'
						|| component.type === 'mk-grid-view-component';
				};

				var preventDefault = function(e){
						e.stopPropagation();
						e.preventDefault();

						return false;
					},
					onDragEnter = function(e){
						e.currentTarget.classList.add('drag-enter');
						return preventDefault(e);
					},
					onDragOver = function(e){
						e.dataTransfer.dropEffect = 'move';

						e.stopPropagation();
						e.preventDefault();

						return false;
					},
					onDragLeave = function(e){
						e.currentTarget.classList.remove('drag-enter');

						return preventDefault(e);
					},
					onDrop = function(e){
					/*	var target = angular.element(e.currentTarget),
							newScope = scope.$new(),
							component = $rootScope.draggingComponent;

						newScope.component = {
							type: component.type,
							resizable: component.type !== 'mk-text-component'
						};

						target.removeClass('drag-enter');

						scope.$apply(function(){
							target.append($compile('<div mk-component='component' {type}></div>'.replace('{type}', component.type))(newScope));
						});

						*//*	target.unbind('dragenter', onDragEnter);
						target.unbind('dragover', onDragOver);
						target.unbind('dragleave', onDragLeave);
						target.unbind('drop', onDrop);*//*

						return preventDefault(e);*/
					}, onParentDragEnter = function(e, args){
						if(!scope.inactive && supportNestedComponent(args.meta)){
							element.addClass('drop-target');
						}
					}, onParentDragLeave = function(e, args){
						if(!scope.inactive && supportNestedComponent(args.meta)){
							element.removeClass('drop-target');
						}
					};

				// let's subscribe for parent events
				scope.$on('drag:enter', onParentDragEnter);

				scope.$on('drag:leave', onParentDragLeave);

				element.bind('dragenter', onDragEnter);
				element.bind('dragover', onDragOver);
				element.bind('dragleave', onDragLeave);
				element.bind('drop', onDrop);
			}

			/*compile: function compile(template) {
				return function (scope, element) {
					element.css('background-image');
				};
			}*/
		};
	}]);
});