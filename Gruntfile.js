module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: {
        src: ['public/compiled/css/**/*.css', 'public/compiled/js/**/*.js']
      }
    },
    compass: {
      build: {
        options: {
          bundleExec: true
        }
      }
    },
    concat: {
      build: {
        src: ['public/js/**/*.js'],
        dest: 'public/compiled/js/app.js'
      }
    },
    cssmin: {
      build: {
        files: {
          'public/compiled/css/app.css': ['public/css/**/*.css']
        }
      }
    },
    ngmin: {
      build: {
        src: ['public/compiled/js/app.js'],
        dest: 'public/compiled/js/app.js'
      }
    },
    rev: {
      build: {
        files: {
          src: [
            'public/compiled/css/*.css',
            'public/compiled/js/*.js'
          ]
        }
      }
    },
    uglify: {
      build: {
        files: {
          'public/compiled/js/app.js': [
            'public/compiled/js/app.js'
          ]
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

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-rev');

  grunt.registerTask('build_dev', ['compass:build']);
  grunt.registerTask('build', [
    'clean:build',
    'concat:build',
    'ngmin:build',
    'uglify:build',
    'compass:build',
    'cssmin:build',
    'rev:build'
  ]);
  grunt.registerTask('default', ['watch:buildDev']);
};
