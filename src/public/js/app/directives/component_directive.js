define(['angular', 'app', 'app/controllers/dialogs/component_settings_controller'], function(angular, app, component_settings_controller){
	'use strict';

	app.directive('mkComponent', ['$dialog', '$timeout', '$compile', 'component_service', function($dialog, $timeout, $compile, componentService){
		return {
			scope: {
				component: '=mkComponent'
			},

			template: '<div class="component" ng-dblclick="showSettings($event)">',

			controller: 'ComponentController',

			replace: true,

			compile: function compile(template) {
				/*template.addClass('component');

				var settingsHandle = angular.element('<div ng-click='showSettings()'>');
				settingsHandle.addClass('component-settings-gear mk-icon mk-icon-cog');

				template.append(settingsHandle);*/

				var getOffset = function (node) {
					var offset = {
						left: 0,
						top: 0
					};
					do {
						if(!isNaN(node.offsetLeft)) {
							offset.left += node.offsetLeft;
						}

						if(!isNaN(node.offsetTop)) {
							offset.top += node.offsetTop;
						}
					} while( node = node.offsetParent );
					return offset;
				};

				return function postLink(scope, element, attrs) {
					var childComponent,
						componentMarkup,
						mappedStyleKey,
						componentConfig;

					if(scope.$parent && scope.$parent.component){
						scope.component.parent = scope.$parent.component;
					}

					scope.showSettings = function(e){
						e.stopPropagation();

						var dialog = $dialog.dialog({
							templateUrl: '/js/templates/dialogs/component_settings.ng',
							controller: component_settings_controller,
							resolve: {
								component: function(){
									return scope.component;
								}
							}
						});

						dialog.open();
					};

					if(scope.component.classes){
						element.addClass(scope.component.classes);
					}

					if(scope.component.meta.support){
						if(scope.component.meta.support.resizing){
							var mouseDowned = false,
								onMouseMove = function(e){

									/*
									ROTATE
									var elementNode = element[0],

									center_x = elementNode.offsetLeft + (elementNode.offsetWidth/2),
									center_y = elementNode.offsetTop + (elementNode.offsetHeight/2),

									mouse_x = e.pageX,
									mouse_y = e.pageY,

									radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
									degree = (radians * (180 / Math.PI) * -1) + 90;

									elementNode.style.webkitTransform = 'rotate('+degree+'deg)';*/

									/* RESIZE */

									var elementNode = element[0],
										offset = getOffset(elementNode),

									/*  center_x = elementNode.offsetLeft + (elementNode.offsetWidth/2)  + editorElement.offsetLeft,
										enter_y = elementNode.offsetTop + (elementNode.offsetHeight/2) + editorElement.offsetTop,*/

										mouse_x = e.pageX,
										mouse_y = e.pageY,

										newWidth = mouse_x - offset.left,
										newHeight = mouse_y - offset.top;

									scope.$apply(function(){
										scope.component.styles.width.value = newWidth + 'px';
										scope.component.styles.height.value = newHeight + 'px';
									});

									/*elementNode.style.width = newWidth + 'px';
										elementNode.style.height = newHeight + 'px'; */

									window.console.log('width:' + newWidth + ' height:' + newHeight);

									/*
									MARGIN
									var editorElement = document.querySelector('.editor-content'),

									componentElement = element[0],
									componentContainerElement = componentElement.parentNode,

									parent_left_bottom_x = componentContainerElement.offsetLeft + componentContainerElement.offsetWidth + editorElement.offsetLeft,
									parent_left_bottom_y = componentContainerElement.offsetTop + componentContainerElement.offsetHeight + editorElement.offsetTop,

									mouse_x = e.pageX,
									mouse_y = e.pageY,

									newRightMargin = parent_left_bottom_x - mouse_x,
									newBottomMargin = parent_left_bottom_y - mouse_y;

									componentElement.style.marginRight =*//* componentElement.style.marginLeft =*//* newRightMargin + 'px';
									componentElement.style.marginBottom = *//*componentElement.style.marginTop = *//*newBottomMargin + 'px';

									window.console.log('margin-right:' + newRightMargin + ' margin-bottom:' + newBottomMargin);*/
								},
								onMouseUp = function(e){
									mouseDowned = false;

									document.body.classList.remove('resizing');

									document.removeEventListener('mouseup', onMouseUp, false);
									document.removeEventListener('mousemove', onMouseMove, false);
								};

							if(!scope.component.fixed){
								var resizeHandle = angular.element('<div>');
								resizeHandle.addClass('component-resize-handle');

								element.append(resizeHandle);

								resizeHandle.bind('mousedown', function(e){

									mouseDowned = true;

									document.body.classList.add('resizing');

									document.addEventListener('mouseup', onMouseUp, false);
									document.addEventListener('mousemove', onMouseMove, false);

									e.preventDefault();
									e.stopPropagation();
								});
							}
						}
					}

					// if component has specific type, lets compile it
					if(scope.component.meta.type){
						element.addClass(scope.component.meta.type);

						// construct component markup
						componentMarkup = ['<', scope.component.meta.type, ' class="inner-component', scope.component.placeholder ? '' : ' initialized', '" style="'];

						componentConfig = componentService.getComponentConfig(scope.component.meta.type);

						Object.keys(componentConfig).forEach(function(configSectionKey){
							var componentConfigSection = scope.component[configSectionKey];

							scope.component[configSectionKey] = componentConfigSection
								? angular.extend(componentConfig[configSectionKey], componentConfigSection)
								: componentConfig[configSectionKey];
						});

						if(scope.component.styles){
							Object.keys(scope.component.styles).forEach(function(styleKey){
								var style = scope.component.styles[styleKey];

								mappedStyleKey = componentService.mapCssSetting(styleKey);

								if(mappedStyleKey){
									componentMarkup.push(mappedStyleKey + ':{{component.styles.' + styleKey + '.value}}' + (style.postfix || '') + ';');
								}
							});
						}

						componentMarkup.push('">');

						if(scope.component.meta.support && scope.component.meta.support.children){
							componentMarkup.push('<div ng-repeat="child in component.children" mk-component="child"></div>');
						}

						componentMarkup.push('</' + scope.component.meta.type + '>');

						window.console.log('component: ' + componentMarkup.join(''));

						childComponent = $compile(componentMarkup.join(''))(scope);

						element.append(childComponent);
					}

					/*element.bind('click', function(e){
						if(e.target.classList.contains('component-settings-gear')){
							$timeout(function(){
								var dialog = $dialog.dialog({
									templateUrl: '/js/templates/dialogs/component_settings.html',
									controller: component_settings_controller
								});

								dialog.open();
							});
						}
					});*/
				};
			}
		};
	}]);
});