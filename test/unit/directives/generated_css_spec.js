define(
	['app/models/stylesheet', 'app/models/stylesheet_rule', 'app',
		'angular-mocks'],
	function(Stylesheet, StylesheetRule) {
		"use strict";

		describe('mikapp.editor.directives.GeneratedCss', function() {
			var directive,
				directiveScope,
				rootScope;

			beforeEach(angular.mock.module('mikapp'));

			beforeEach(function() {

				angular.mock.inject(function($compile, $rootScope) {
					rootScope = $rootScope;

					directiveScope = $rootScope.$new();

					directiveScope.stylesheet = new Stylesheet('az-stylesheet',
						'print', [new StylesheetRule('.class-1', {
							color: 'red'
						}), new StylesheetRule('p', {
							'font-size': '12px'
						})]);

					directive = $compile(
						'<div mk-generated-css="stylesheet"></div>')(
							directiveScope);
				});
			});

			it('should add new style tag into the document head.',
				function() {
					directiveScope.$apply();

					var styleTag = document.getElementById(
						directiveScope.stylesheet.id);

					expect(styleTag).toBeDefined();
					expect(styleTag).not.toBeNull();
					expect(styleTag.media).
						toEqual(directiveScope.stylesheet.media);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].styles.color)).
						toBeGreaterThan(-1);

					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[1].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[1].styles['font-size'])
					).toBeGreaterThan(-1);

					directiveScope.stylesheet =  new Stylesheet('az-stylesheet',
						'screen', [new StylesheetRule('.class-1', {
							color: 'red'
						}), new StylesheetRule('p', {
							'font-size': '12px'
						}), new StylesheetRule('span', {
							'background': '#333'
						})]);

					directiveScope.$apply();

					styleTag = document.getElementById(
						directiveScope.stylesheet.id);

					expect(styleTag).toBeDefined();
					expect(styleTag).not.toBeNull();
					// Here we check that style node wasn't recreated
					expect(styleTag.media).not.
						toEqual(directiveScope.stylesheet.media);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].styles.color)).
						toBeGreaterThan(-1);

					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[1].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[1].styles['font-size'])
					).toBeGreaterThan(-1);

					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[2].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[2].styles.background)).
						toBeGreaterThan(-1);

					directiveScope.stylesheet =  new Stylesheet('az-stylesheet',
						null, [new StylesheetRule('.class-1', {
							color: 'red'
						})]);

					styleTag.parentNode.removeChild(styleTag);

					directiveScope.$apply();

					styleTag = document.getElementById(
						directiveScope.stylesheet.id);

					expect(styleTag).toBeDefined();
					expect(styleTag).not.toBeNull();
					expect(styleTag.media).
						toEqual('screen');
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].selector)).
						toBeGreaterThan(-1);
					expect(styleTag.textContent.indexOf(
						directiveScope.stylesheet.rules[0].styles.color)).
						toBeGreaterThan(-1);
				});
		});
	}
);