module.exports = function(grunt) {
  grunt.initConfig({
    compass: {
      buildDev: {
        options: {
          bundleExec: true
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build_dev', ['compass:buildDev']);
  grunt.registerTask('default', ['watch:buildDev']);
};
