/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		production_requirejs_options: {

			appDir:'<%= pkg.src %>/public/',
			baseUrl:'./js/',
			dir:'<%= pkg.dest %>/production/public/',

			optimize:"none",

			optimizeCss:"standard.keepLines",

			removeCombined: true,

			inlineText: true,

			paths: {
				angular: "libs/angular",
				"ui-bootstrap": "libs/ui-bootstrap-0.2.0",
				underscore: "libs/lodash.min",
				rText: "libs/requirejs/plugins/text",
				ri18n: "libs/requirejs/plugins/i18n"
			},

			shim: {
				angular: {
					exports: 'angular'
				}
			},

			modules:[{
				name:"libs/requirejs/require"
			}, {
				name:"bootstrap"
			}],

			preserveLicenseComments: false,

			uglify2: {
				conditionals: true,
				no_mangle: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				if_return: true
			},

			keepBuildDir: false,

			generateSourceMaps:false,
			useSourceUrl: false
		},

		development_requirejs_options: {
			appDir:'<%= pkg.src %>/public/',
			baseUrl:'./js/',
			dir:'<%= pkg.dest %>/development/public/',

			optimize:"none",

			optimizeCss:"none",

			removeCombined: true,

			inlineText: true,

			paths: {
				angular: "libs/angular",
				"ui-bootstrap": "libs/ui-bootstrap-0.2.0",
				underscore: "libs/lodash.min",
				rText: "libs/requirejs/plugins/text",
				ri18n: "libs/requirejs/plugins/i18n"
			},

			modules:[{
				name:"libs/requirejs/require"
			}, {
				name:"bootstrap"
			}],

			preserveLicenseComments: false
		},

		clean: {
			production: [
				'<%= pkg.dest %>/production/*',
				'!<%= pkg.dest %>/production/node_modules',
				'!<%= pkg.dest %>/production/iisnode.yml',
				'!<%= pkg.dest %>/production/web.config'
			],
			development: ['<%= pkg.dest %>/development/']
		},

		copy: {
			development: { 
				files:[{
					expand: true,
					cwd: '<%= pkg.src %>/',
					src: ['*'],
					dest: '<%= pkg.dest %>/development/', filter: 'isFile'
				}]
			},

			production: { 
				files:[{
					expand: true,
					cwd: '<%= pkg.src %>/',
					src: ['*'],
					dest: '<%= pkg.dest %>/production/', filter: 'isFile'
				}]
			}
		},

		jshint: {
			uses_defaults: [
				'<%= pkg.src %>/public/js/app/**/*.js',
				'<%= pkg.src %>/public/js/*.js'
			],

			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				laxbreak: true,

				globals:{
					require: true,
					define: true
				}
			}
		},

		jasmine: {
			custom: {
				options: {
					specs: '<%= pkg.spec %>/**/*.js',
					template: '<%= pkg.spec %>/spec-runner.tmpl'
				}
			}
		},

		less: {
			development: {
				options: {
					paths: ["<%= pkg.dest %>/development/public/css"]
				},
				files: {
					"<%= pkg.dest %>/development/public/css/index.css": "<%= pkg.dest %>/development/public/css/index.less"
				}
			},
			production: {
				options: {
					paths: ["<%= pkg.dest %>/production/public/css"],
					yuicompress: true
				},
				files: {
					"<%= pkg.dest %>/production/public/css/index.css": "<%= pkg.dest %>/production/public/css/index.less"
				}
			}
		},

		requirejs: {
			production: {
				options: '<%= production_requirejs_options %>'
			},
			development: {
				options: '<%= development_requirejs_options %>'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Default task.
	grunt.registerTask('default', ['jshint', 'requirejs', 'less:production']);
	grunt.registerTask('production', ['clean:production', 'jshint', 'copy:production', 'requirejs:production', 'less:production']);
	grunt.registerTask('test', ['jshint', 'jasmine']);
};
