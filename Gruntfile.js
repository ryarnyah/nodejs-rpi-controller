module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
		options: {
			separator: ';'
		},
		dist: {
			src: ['src/js/**/*.js'],
			dest: 'public/js/<%= pkg.name %>.js'
		}
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
		mangle: false
      },
      dist: {
        files: {
          'public/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
        }
      }
    },
	jade: {
		compile: {
			options: {
			  data: {
				debug: false
			  }
			},
			files: {
			  "public/partials/ps.html": "src/jade/partials/ps.jade",
			  "public/partials/load.html": "src/jade/partials/load.jade",
			  "public/partials/network.html": "src/jade/partials/network.jade",
			  "public/partials/mounts.html": "src/jade/partials/mounts.jade",
			  "public/partials/mem.html": "src/jade/partials/mem.jade",
			  "public/partials/info.html": "src/jade/partials/info.jade",
			  "public/partials/shutdown.html": "src/jade/partials/shutdown.jade",
			  "public/partials/uptime.html": "src/jade/partials/uptime.jade",
			  "public/layout.html": "src/jade/layout.jade",
			  "public/index.html": "src/jade/index.jade"
			}
		  }
	},
	copy: {
	  main: {
		files: [
		  // includes files within path
		  {expand: true, cwd: 'src/web/', src: ['*'], dest: 'public/'},
		  {expand: true, cwd: 'src/web/js', src: ['*.js'], dest: 'public/js'},
		  {expand: true, cwd: 'src/web/', src: ['**/*.css'], dest: 'public/'},
		  {expand: true, cwd: 'src/web/', src: ['**/*.min.js'], dest: 'public/'},
		  {expand: true, cwd: 'src/web/', src: ['**/*.map'], dest: 'public/'},
		]
	  }
	},
	clean: ["public"],
	nodemon: {
	  dev: {
		script: 'app.js',
		options: {
			ext: 'js,json',
			ignore: ['node_modules/**', 'public/**']
		}
	  }
	},
	bgShell: {
      _defaults: {
        bg: true
      },
      watch: {
        cmd: 'grunt watch'
      }
    },
	watch: {
	  scripts: {
		files: ['src/jade/**/*.jade', 'src/js/**/*.js'],
		tasks: ['default'],
		options: {
		  spawn: false,
		},
	  },
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bg-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'jade']);
  grunt.registerTask('run', ['clean', 'copy', 'concat', 'uglify', 'jade', 'bgShell', 'nodemon']);
};