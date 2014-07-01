module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      buildDev: {
        options: {
          sourcemap: true
        },
        files: {
          'public/css/styles.css': 'public/scss/styles.scss'
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build_dev', ['sass:buildDev']);
  grunt.registerTask('default', ['watch:buildDev']);
};
