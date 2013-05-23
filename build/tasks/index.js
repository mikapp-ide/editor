module.exports = function(grunt) {
	grunt.registerTask('index', 'Generate index.html depending on configuration', function(environment) {
		var config = grunt.config('index')[environment],
			tmpl = grunt.file.read(config.src);

		grunt.file.write(config.dest, grunt.template.process(tmpl, {
			environment: environment
		}));

		grunt.log.writeln('Generated \'' + config.dest + '\' from \'' + config.src + '\'');
	});
};