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
            html: {
                src: ['index.html', 'app/**/*.html'],
                dest: 'build/'
            },
            assets: {
                src: ['assets/favicons/**.*',
                        'assets/img/github.png',
                        'assets/img/bronze_medal.png',
                        'assets/img/silver_medal.png',
                        'assets/img/gold_medal.png',
                        'assets/img/viking.png'],
                dest: 'build/'
            },
            typicons: {
                expand: true,
                cwd: 'bower_components/typicons.font/src/font/',
                src: ['typicons.*', '!*.css'],
                dest: 'build/css/'
            }
        },
        jshint: {
            all: ['app/**/*.js']
        },
        csslint: {
            options: {
                csslintrc: 'grunt_configs/.csslintrc'
            },
            all: ['app/**/*.css']
        },
        clean: ['.tmp/', 'build/']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
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
        'copy:html',
        'copy:typicons',
        'copy:assets',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
	]);

    grunt.registerTask('cleanAll', ['clean']);
};