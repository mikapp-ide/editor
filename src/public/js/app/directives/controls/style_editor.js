define(['app/models/component_type'], function(ComponentType) {
	'use strict';

	return ['configuration', function(config){
		return {
			templateUrl: config.templates.base + 'controls/style_editor.ng',

			replace: true,

			scope: {
				model: '=mkStyleEditor'
			},

			link: function(scope, element, attrs) {
				scope.type = ComponentType.EditorType;

				scope.isSelect = function() {
					return scope.model.type === scope.type.SELECT;
				};

				scope.isBasic = function() {
					return scope.model.type !== scope.type.SELECT;
				};
			}
		};
	}];
});