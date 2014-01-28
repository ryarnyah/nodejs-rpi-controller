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
		  // i18n
		  {expand: true, cwd: 'src/i18n', src: ['**'], dest: 'public/i18n'},
		]
	  }
	},
	clean: ["public", "*.tar.gz"],
	nodemon: {
	  dev: {
		script: 'app.js',
		options: {
			ext: 'js,json',
			ignore: ['node_modules/**', 'public/**', 'src/js/**']
		}
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
	},
	manifest: {
		generate: {
		  options: {
			basePath: 'public',
			network: ['*'],
			verbose: true,
			timestamp: true,
			hash: true,
			master: ['index.html']
		  },
		  src: [
			'**/*.html',
			'**/*.min.js',
			'**/*.css',
			'**/*.json',
			'**/*.map'
		  ],
		  dest: 'public/cache-manifest.manifest'
		}
	},
	compress: {
	  main: {
		options: {
			archive: '<%= pkg.name %>.tar.gz'
		},
		files: [
		  {src: ['public/**', 'app.js', 'src/node/**', 'package.json', 'src/install/**']}
		]
	  }
	},
	secret: grunt.file.readJSON('secret.json'),
	sftp: {
	  deploy: {
		files: {
		  "./": "<%= pkg.name %>.tar.gz"
		},
		options: {
		  path: '/opt/node/apps/<%= pkg.name %>',
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>',
		  showProgress: true
		}
	  }
	},
	sshexec: {
	  mkdir: {
		command: ['mkdir -p /opt/node/apps/<%= pkg.name %>'],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  },
	  deploy: {
		command: ['cd /opt/node/apps/<%= pkg.name %> && tar xzf <%= pkg.name %>.tar.gz && /opt/node/bin/npm install --ignore-scripts --production'],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  },
	  stop: {
		command: ['sudo /etc/init.d/<%= pkg.name %>-startup.sh stop'],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  },
	  start: {
		command: ['sudo nohup /etc/init.d/<%= pkg.name %>-startup.sh start'],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  },
	  clean: {
		command: ['rm /opt/node/apps/<%= pkg.name %>/<%= pkg.name %>.tar.gz'],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  },
	  install: {
		command: ['cd /opt/node/apps/<%= pkg.name %>/src/install && sudo mv <%= pkg.name %>-startup.sh /etc/init.d/ && sudo update-rc.d <%= pkg.name %>-startup.sh defaults && sudo chmod +x /etc/init.d/<%= pkg.name %>-startup.sh '],
		options: {
		  host: '<%= secret.host %>',
		  username: '<%= secret.username %>',
		  password: '<%= secret.password %>'
		}
	  }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('default', ['copy', 'concat', 'jade']);
  grunt.registerTask('dist', ['default', 'uglify', 'manifest', 'compress']);
  grunt.registerTask('run', ['clean', 'default', 'uglify', 'nodemon']);
  grunt.registerTask('deploy', ['dist', 'sshexec:stop', 'sshexec:mkdir', 'sftp', 'sshexec:deploy', 'sshexec:install', 'sshexec:start', 'sshexec:clean']);
};