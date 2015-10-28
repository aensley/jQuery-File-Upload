/*global module, require */
module.exports = function (grunt) {
	'use strict';
	grunt.initConfig({
		copy: {
			dist: {
				files: {
					'dist/UploadHandler.php': 'UploadHandler.php',
					'dist/files/.htaccess': '../server/php/files/.htaccess',
					'dist/loading.gif': '../img/loading.gif',
					'dist/progressbar.gif': '../img/progressbar.gif',
					'dist/form.html': 'form.html',
				},
			},
		},
		concat: {
			index: {
				src: ['authcheck.php', 'index.html'],
				dest: 'dist/index.php',
			},
			uploader: {
				src: ['authcheck.php', '../server/php/index.php'],
				dest: 'dist/upload.php',
			},
		},
		replace: {
			dist: {
				options: {
					patterns: [
						{
							match: /..\/img\//g,
							replacement: '',
						},
					],
				},
				files: [
					{
						src: ['../css/jquery.fileupload-ui.css'],
						dest: 'jquery.fileupload-ui.css',
					},
				],
			},
		},
		cssmin: {
			options: {
				report: 'min',
			},
			dist: {
				files: {
					'dist/style.min.css': [
						'../css/jquery.fileupload.css',
						'jquery.fileupload-ui.css',
					],
				},
			},
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
				},
				files: [
					{
						src:'index.html',
						dest:'index.min.html',
					},
				],
			},
		},
		uglify: {
			options: {
				report: 'min',
				preserveComments: 'some',
				screwIE8: true,
				mangle: {
					except: [
						'$',
						'jQuery',
					],
				}
			},
			dist: {
				files: {
					'dist/script.min.js': [
						'../js/vendor/jquery.ui.widget.js',
						'tmpl.min.js',
						'load-image.all.min.js',
						'../js/jquery.iframe-transport.js',
						'../js/jquery.fileupload.js',
						'../js/jquery.fileupload-process.js',
						'../js/jquery.fileupload-image.js',
						'../js/jquery.fileupload-audio.js',
						'../js/jquery.fileupload-video.js',
						'../js/jquery.fileupload-validate.js',
						'../js/jquery.fileupload-ui.js',
						'script.js',
					],
					'dist/dialog.min.js': ['dialog.js'],
				},
			},
		},
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.registerTask('default', ['htmlmin', 'copy', 'concat', 'replace', 'cssmin', 'uglify']);
};
