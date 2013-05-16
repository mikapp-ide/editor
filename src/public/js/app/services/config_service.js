define(["angular", "app"], function(angular, app){
	app.factory("config", function(){
		return {
			services: {
				data: "/api",
				compile: "http://mika.compile"
			}
		};
	});
});