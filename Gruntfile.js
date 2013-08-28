module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bump');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bump: {
			options: {
				files: ['package.json'],
				updateConfigs: ['pkg'],
				commit: true,
				commitMessage: 'release %VERSION%',
				commitFiles: ['-a'], // '-a' for all files
				createTag: true,
				tagName: '%VERSION%',
				tagMessage: 'version %VERSION%',
				push: true,
				pushTo: 'origin',
				// cargo cult magic.. wtf?
				// options to use with '$ git describe'
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
			}
		},
		jshint: {
			all: {
				options: {
					reporter: './node_modules/jshint-path-reporter',
					jshintrc: '.jshintrc'
				},
				src: [
					'Gruntfile.js',
					'lib/**/*.js',
					'test/**/*.js'
				]
			}
		},
		clean: {
			tmp: ['tmp/**/*', 'test/tmp**/*']
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
	grunt.registerTask('build', ['clean', 'jshint:all']);

	grunt.registerTask('test', ['build', 'mochaTest:pass']);
	grunt.registerTask('run', ['build', 'mochaTest:spec']);

};