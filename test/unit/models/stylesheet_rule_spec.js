define(['app/models/stylesheet_rule'], function(StylesheetRule) {
	'use strict';

	describe('mikapp.editor.models.StylesheetRule', function() {

		it('should be instantiated correctly.', function() {
			var styles = { color: 'red' },
				stylesheetRule = new StylesheetRule('.class', styles);

			expect(stylesheetRule.selector).toEqual('.class');
			expect(stylesheetRule.styles).toEqual(styles);
		});

		it('should be deserialized correctly.', function() {
			var rawStylesheetRule = {
				selector: 'selector',
				styles: {
					color: 'red',
					font: 'Arial'
				}
			};

			var stylesheetRule = StylesheetRule.deserialize(rawStylesheetRule);

			expect(stylesheetRule instanceof StylesheetRule).toBe(true);
			expect(stylesheetRule.selector).toEqual(rawStylesheetRule.selector);
			expect(Object.keys(stylesheetRule.styles)).toEqual(
				Object.keys(rawStylesheetRule.styles));
			expect(stylesheetRule.styles).toEqual(rawStylesheetRule.styles);
		});

	});
});