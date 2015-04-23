'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    clean: ['dist/assets'],
    concurrent: {
      dev: ['nodemon:app', 'webpack:dev', 'less', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },
    jshint: {
      all: [
        '*.js',
        '{actions,configs,components,services,stores}/**/*.js'
      ],
      options: {
        jshintrc: true
      }
    },
    nodemon: {
      app: {
        script: './babel-server.js',
        options: {
          ignore: ['dist/assets/**'],
          ext: 'js,jsx'
        }
      }
    },
    webpack: {
      dev: {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        entry: './client.js',
        output: {
          path: './dist/assets',
          publicPath: '/public/assets/',
          filename: '[name].js'
        },
        style: {
          src: 'style/main.less',
          loader: 'less',
          dest: 'dist/assets/app.css'
        },
        module: {
          loaders: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve('babel-loader')},
            {test: /\.json$/, loader: 'json-loader'}
          ]
        },
        stats: {
          colors: true
        },
        devtool: 'source-map',
        watch: true,
        keepalive: true
      }
    },
    less: {
      development: {
        files: {
          "dist/assets/app.css": "style/main.less"
        }
      }
    },
    watch: {
      files: ['style/**/*.less'],
      tasks: ['less']
    }
  });

  // libs
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // tasks
  grunt.registerTask('default', ['clean', 'concurrent:dev']);
};

