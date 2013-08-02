define(function() {
	'use strict';

	/**
	 * Creates user stylesheet.
	 * @param {mikapp.editor.models.Stylesheet} stylesheet
	 */
	var createCss = function(stylesheet) {
		var cssText = '',
			styleNode;

		// If the stylesheet doesn't exist, create a new node
		if ((styleNode = document.getElementById(stylesheet.id)) === null) {
			styleNode = document.createElement('style');
			styleNode.id = stylesheet.id;
			styleNode.type = 'text/css';
			styleNode.media = stylesheet.media;
			document.getElementsByTagName('head')[0].appendChild(styleNode);
		}

		// Generate CSS text
		stylesheet.rules.forEach(function(rule) {
			cssText += '.' + rule.selector + ' {\n';

			Object.keys(rule.styles).forEach(function(key) {
				cssText += '\t' + key + ': ' +
					rule.styles[key] + ';\n';
			});

			cssText += '}\n\n';
		});

		// Internet Explorer
		if (styleNode.styleSheet) {
			try {
				styleNode.styleSheet.cssText = cssText;
			} catch (e) {
				throw new(Error)('Could not reassign stylesheet.cssText.');
			}
		} else {
			(function (node) {
				if (styleNode.childNodes.length > 0) {
					if (styleNode.firstChild.nodeValue !== node.nodeValue) {
						styleNode.replaceChild(node, styleNode.firstChild);
					}
				} else {
					styleNode.appendChild(node);
				}
			})(document.createTextNode(cssText));
		}
	};

	return function() {
		return {
			restrict: 'A',

			link: function(scope, element, attrs) {
				scope.$watch(attrs.mkGeneratedCss, function(stylesheet) {
					if (stylesheet && stylesheet.rules.length > 0) {
						createCss(stylesheet);
					}
				}, true);
			}
		};
	};
});