'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      dev: {
        src: ['Gruntfile.js', 'js/*.js'],
        options: {
          globalstrict: true,
          globals: {
            console: true,
            module: true,
            require: true,
            document: true,
            window: true
          }
        }
      }
    },

    watch: {
      dev:{
        files: ['js/*.js', 'Gruntfile.js'],
        tasks: ['default'],
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/build/tetris.min.js': ['js/build/tetris.js'],
        }
      }
    },

    browserify: {
      dev: {
        entry: './js/tetris.js',
        files: {'./js/build/tetris.js': ['js/*.js']},
        options: {
          alias: ["./js/tetris.js:Tetris"],
          require: ['./js/tetris.js'],
          debug: true
        }
      },
      specs: {
        src: ["js/test/*.spec.js"],
        dest: "js/test/build/spec.js",
      }
    },

    jasmine: {
      dev: {
        options: {
          specs: './js/test/build/spec.js',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
  grunt.registerTask('compile', ['default']);
};
