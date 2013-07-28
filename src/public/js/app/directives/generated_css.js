define(function() {
	'use strict';

	var createCss = function(styleSheet) {
		var cssText = '',
			styleNode;

		// If the stylesheet doesn't exist, create a new node
		if ((styleNode = document.getElementById(styleSheet.id)) === null) {
			styleNode = document.createElement('style');
			styleNode.type = 'text/css';
			styleNode.media = styleSheet.media || 'screen';
			document.getElementsByTagName('head')[0].appendChild(styleNode);
		}

		// generate CSS text
		styleSheet.rules.forEach(function(rule) {
			cssText += rule.selector + ' {';

			Object.keys(rule.styles).forEach(function(key) {
				cssText += key + ': ' +
					rule.styles[key] + ';\n';
			});

			cssText += '}\n\n';
		});

		// Internet Explorer
		if (styleNode.styleSheet) {
			try {
				styleNode.styleSheet.cssText = cssText;
			} catch (e) {
				throw new(Error)("Couldn't reassign styleSheet.cssText.");
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

				var style = document.createElement('style');
				style.type = 'text/css';
				document.getElementsByTagName('head')[0].appendChild(style);

				scope.$watch(attrs.mkGeneratedCss, function(styleSheet) {
					if (styleSheet && styleSheet.rules.length > 0) {
						createCss(styleSheet);
					}
				}, true);
			}
		};
	};
});