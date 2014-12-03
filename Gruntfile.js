module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      dev:{
        files: ['js/*.js'],
        tasks: ['default'],
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/build/tetronimo.js': ['js/*.js'],
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
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);
};
