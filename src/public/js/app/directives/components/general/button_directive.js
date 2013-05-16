define(["angular", "app"], function(angular, app){
	app.directive("mkButtonComponent", ["$compile", "$rootScope", function($compile, $rootScope){
		return {
			restrict: "E",

			template: "<button contenteditable='true' class='btn-primary'>{{component.properties.text.value}}</button>",

			replace: true
		};
	}]);
});