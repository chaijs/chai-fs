module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: {
				options: {
					reporter: './node_modules/jshint-path-reporter',
					jshintrc: '.jshintrc'
				},
				src: [
					'Gruntfile.js',
					'index.js',
					'test/**/*.js'
				]
			}
		},
		mochaTest: {
			options: {
				reporter: 'mocha-unfunk-reporter'
			},
			pass: {
				src: ['test/init.js', 'test/specs/*.js']
			},
			spec : {
				options: {
					reporter: 'Spec'
				},
				src: ['test/init.js', 'test/specs/*.js']
			}
		}
	});

	grunt.registerTask('default', ['test']);
	grunt.registerTask('build', ['jshint:all']);

	grunt.registerTask('test', ['build', 'mochaTest:pass']);
	grunt.registerTask('run', ['build', 'mochaTest:spec']);

};