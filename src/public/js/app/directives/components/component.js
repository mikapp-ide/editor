define(['angular'], function(angular){
	'use strict';

	return ['$dialog', '$compile', 'ComponentService',
		function($dialog, $compile, componentService) {
			return {
				scope: {
					component: '=mkComponent'
				},

				template: '<div class="component" ' +
					'ng-click="select($event, component)">',

				controller: 'ComponentController',

				replace: true,

				compile: function compile(template) {


					return function postLink(scope, element, attrs) {
						var childComponent,
							componentMarkup,
							mappedStyleKey,
							componentConfig;

						scope.select = function(e, component) {
							e.stopPropagation();

							var selectedClassName = 'component-selected';

							var selectedComponent =
								window.document.querySelector('.' +
									selectedClassName);

							if (selectedComponent) {
								selectedComponent.classList.remove(
									selectedClassName);
							}

							element.toggleClass(selectedClassName);

							scope.$emit('component-selected', component);
						};

						/*if(scope.$parent && scope.$parent.component){
							scope.component.parent = scope.$parent.component;
						}*/

						if(scope.component.cssClass){
							element.addClass(scope.component.cssClass);
						}

						element.addClass(scope.component.type.id +
							'-component');

						// construct component markup
						componentMarkup = [
							'<', scope.component.type.id,
								' class="inner-component"',
							'>'
						];

						if(scope.component.type.supportChildren()){
							componentMarkup.push('<div' +
								' ng-repeat="child in component.children" ' +
								'mk-component="child"></div>');
						}

						componentMarkup.push('</' + scope.component.type.id +
							'>');

						window.console.log('component: ' +
							componentMarkup.join(''));

						childComponent = $compile(componentMarkup.join(''))(
							scope);

						element.append(childComponent);
					};
				}
			};
		}
	];
});