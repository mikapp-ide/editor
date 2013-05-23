define([
	'angular',
	'app'
], function (angular, app) {
	'use strict';

	var setProperties = function(component, properties){
		if(properties){
			if(properties.css){
				properties.css.forEach(function(cssProperty){
					if(component.css.hasOwnProperty(cssProperty.id)){
						component.css[cssProperty.id] = cssProperty.value;
					}
				});
			}
		}
	};

	return app.controller('ComponentController', ['$rootScope', '$scope', function ($rootScope, $scope) {
		$scope.component.setProperties = function(properties){
			return setProperties(this, properties);
		};

		var defineEntity = function(storeKey, name, type, label, configurable, value){
			var store = $scope.component[storeKey] || {};

			store[name] = {
				type: type,
				label: label,
				configurable: configurable,
				value: value
			};

			$scope.component[storeKey] = store;
		};

		$scope.defineProperty = function(name, type, label, configurable, value){
			defineEntity('properties', name, type, label, configurable, value);
		};

		$scope.defineStyle = function(name, type, label, configurable, value){
			defineEntity('styles', name, type, label, configurable, value);
		};
	}]);
});