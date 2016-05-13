module.exports = function (grunt) {

    grunt.initConfig({

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'build'
            }
        },
        usemin: {
            html: ['build/index.html']
        },
        copy: {
            main: {
                src: ['index.html', 'app/**/*.html'],
                dest: 'build/'
            },
            assets: {
                src: ['assets/favicons/**.*', 'assets/img/**.*'],
                dest: 'build/'
            },
            typcions: {
                expand: true,
                cwd: 'assets/bower_components/typicons/src/font/',
                src: ['typicons.*'],
                dest: 'build/dist/css/'
            }
        },
        jshint: {
            all: ['app/**/*.js']
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: ['app/**/*.css']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('build', [
        'jshint',
        'csslint',
        'copy:main',
        'copy:typcions',
        'copy:assets',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
	]);
};