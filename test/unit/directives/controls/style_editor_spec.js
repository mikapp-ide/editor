define(
	['app/models/component_type', 'rText!templates/controls/style_editor.ng',
		'app', 'angular-mocks'],
	function(ComponentType, styleEditorTemplate) {
		"use strict";

		describe('mikapp.editor.directives.StyleEditor', function() {
			var directive,
				directiveScope;

			beforeEach(angular.mock.module('mikapp'));

			beforeEach(function() {

				angular.mock.inject(function($injector, $compile, $rootScope,
					$templateCache) {
					var config = $injector.get('configuration');

					$templateCache.put(config.templates.base +
						'controls/style_editor.ng', styleEditorTemplate);

					directiveScope = $rootScope.$new();

					directiveScope.style = {
						id: 'style',
						label: 'Mega style',
						type: ComponentType.EditorType.NUMBER
					};

					directive = $compile(
						'<div mk-style-editor="style"></div>')(
							directiveScope);
				});
			});

			it('should create style editor with label and appropriate control.',
				function() {
					directiveScope.$apply();

					var label = directive[0].querySelector('label[for=' +
						directiveScope.style.id + ']'),
						control = directive[0].querySelector(
							'input[type=number]'),
						options;

					expect(label).toBeDefined();
					expect(label).not.toBeNull();
					expect(label.textContent.toLowerCase()).
						toEqual(directiveScope.style.label.toLowerCase());

					expect(control).toBeDefined();
					expect(control).not.toBeNull();
					expect(control.id).toEqual(directiveScope.style.id);

					directiveScope.style.id = 'style-1';
					directiveScope.style.label = 'Mega style-1';
					directiveScope.style.type = ComponentType.EditorType.COLOR;
					directiveScope.$apply();

					control = directive[0].querySelector('input[type=color]');

					expect(control).toBeDefined();
					expect(control).not.toBeNull();
					expect(control.id).toEqual(directiveScope.style.id);

					directiveScope.style.id = 'style-2';
					directiveScope.style.label = 'Mega style-2';
					directiveScope.style.type = ComponentType.EditorType.TEXT;
					directiveScope.$apply();

					control = directive[0].querySelector('input[type=text]');

					expect(control).toBeDefined();
					expect(control).not.toBeNull();
					expect(control.id).toEqual(directiveScope.style.id);

					directiveScope.style.id = 'style-3';
					directiveScope.style.label = 'Mega style-3';
					directiveScope.style.type = ComponentType.EditorType.SELECT;
					directiveScope.style.options =  [{
						value: 'value-1',
						label: 'label-1'
					}, {
						value: 'value-2',
						label: 'label-2'
					}];
					directiveScope.style.value = 'value-1';
					directiveScope.$apply();

					control = directive[0].querySelector('select');

					expect(control).toBeDefined();
					expect(control).not.toBeNull();
					expect(control.id).toEqual(directiveScope.style.id);

					options = control.querySelectorAll('option');

					expect(options).not.toBeNull();
					expect(options.length).
						toEqual(directiveScope.style.options.length);
					expect(options[0].value).toEqual('0');
					expect(options[0].textContent).toEqual(
						directiveScope.style.options[0].label);
					expect(options[1].value).toEqual('1');
					expect(options[1].textContent).toEqual(
						directiveScope.style.options[1].label);
				});
		});
	}
);