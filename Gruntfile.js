module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      build: {
        options: {
          bundleExec: true
        }
      }
    },
    ngmin: {
      build: {
        src: ['public/js/**/*.js'],
        dest: 'public/compiled.js'
      }
    },
    uglify: {
      build: {
        files: {
          'public/compiled.js': ['public/compiled.js']
        }
      }
    },
    watch: {
      buildDev: {
        files: ['public/scss/**/*.scss'],
        tasks: ['build_dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.registerTask('build_dev', ['compass:build']);
  grunt.registerTask('build', [
    'ngmin:build',
    'uglify:build',
    'compass:build'
  ]);
  grunt.registerTask('default', ['watch:buildDev']);
};
