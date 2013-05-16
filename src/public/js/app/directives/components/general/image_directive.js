define(["angular", "app"], function(angular, app){
	app.directive("mkImageComponent",  function () {
		return {
			restrict: "E",

			link: function(scope, element){
				element.text("X");
				/*scope.defineStyle("background_image", "file", "Image", true);*/
			}
		};
	});
});