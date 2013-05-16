define(["angular", "app"], function(angular, app){
	app.directive("mkMapComponent", ["$compile", "$rootScope", function($compile, $rootScope){
		return {
			restrict: "E",

			template: '<iframe style="width:100%;height:100%;" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=37.778368,-122.409198&amp;num=1&amp;ie=UTF8&amp;ll=37.778278,-122.409214&amp;spn=0.016756,0.037594&amp;t=m&amp;z=14&amp;output=embed"></iframe>',

			compile: function compile(template) {
				return function (scope, element) {
					var coordinates = "37.778368,-122.409198";
				/*	scope.component.styles.background_image = {
						value: "url(http://maps.googleapis.com/maps/api/staticmap?sensor=false"
							+ "&CENTER=" + coordinates
							+ "&markers=" + "color:red|" + coordinates
							+ "&zoom=17"
							+ "&size=640x320"
							+ "&key=AIzaSyCgPLXrKGEZhJODvc4DqmN9y2hFg_IFQuE)"
					};*/

					scope.component.styles.width.value = "425px";
					scope.component.styles.height.value = "350px";
				};
			}
		};
	}]);
});