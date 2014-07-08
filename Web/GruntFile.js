module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                "curly": true,
                "eqnull": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "browser": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    $: true,
                    console: true
                }
            },
            uses_defaults: ['javascript/*js']
        },

        concat: {
            dist: {
                src: [
                    'javascript/libs/jQuery-2.1.1.js',
                    'javascript/libs/underscore-1.6.0.js',
                    'javascript/libs/backbone-1.1.2.js',
                    'handlebars-v1.3.0.js',
                    'less-1.3.3.min.js',
                    'javascript/src/*js'
                ],
                dest: 'javascript/dest/build.js'
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> -v <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'javascript/dest/build.js',
                dest: 'javascript/dest/build.min.js'
            }
        },

        less: {
            development: {
                options: {
                    paths: ['css'],
                    banner: '/* <%= pkg.name %> -v <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'css/src/style.css': 'less/src/style.less'
                }
            }
        },

        cssmin: {
            with_banner: {
                options: {
                    banner: '/* <%= pkg.name %> -v <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'css/dest/style.min.css': ['css/libs/bootstrap.css', 'css/libs/bootstrap-theme.css', 'css/src/*css']
                }
            }
        },

        watch: {
            scripts: {
                files: ['javascript/src/*js', 'less/src/*less', 'css/*css'],
                tasks: ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'removelogging']
            }
        },

        removelogging: {
            dist: {
                src: 'javascript/dest/build.min.js',
                dest: 'javascript/dest/build.clean.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less', 'cssmin', 'removelogging', 'watch'])
};
