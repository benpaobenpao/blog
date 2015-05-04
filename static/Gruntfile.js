'use strict';

// // livereload 默认的端口
// var LIVERELOAD_PORT = 35729;

// // 连接中间件的注入脚本到静态的html服务
// var lrSnippet = require('connect-livereload')({
//   port: LIVERELOAD_PORT
// });

// // 所有必要的中间件来提供静态文件。
// var livereloadMiddleware = function(connect, options) {
//   return [
//     // 注入livereloading脚本到静态文件。
//     lrSnippet,
//     // 静态文件。
//     connect.static(options.base),
//     // 让空目录浏览。
//     connect.directory(options.base)
//   ];
// };

module.exports = function(grunt) {
  // 配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 该连接的任务是用来提供静态文件与本地服务器。
    // connect: {
    //   options: {
    //     port: 8080,
    //     hostname: 'localhost'
    //     //hostname: '192.168.0.104'
    //   },
    //   client: {
    //     options: {
    //       base: '.',
    //       middleware: livereloadMiddleware
    //     }
    //   }
    // },
    // jade: {
    //   dist: {
    //     options: { // Target options
    //       pretty: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: "./source/jade",
    //       src: ["*.jade"], 
    //       dest: "./",
    //       ext: '.html'
    //     }]
    //   }
    // },
    // jshint: {
    //   options: {
    //     curly: true,
    //     eqeqeq: true,
    //     eqnull: true,
    //     browser: true
    //   },
    //   uses_defaults: ["!./source/javascript/libs/", "./source/javascript/**.js"]
    // },
    uglify: {
      dist: {
        options: {
          mangle: true
        },
        files: [{
          expand: true,
          cwd: "source/js",
          src: "**/*.js",
          dest: "public/js",
          ext: ".min.js" 
        }]
      },
      mix: {
        options: {
          mangle: false
        },
        files: [{
          expand: true,
          cwd: "source/mix",
          src: "**/*.js",
          dest: "public/mix",
          ext: ".min.js" 
        }]
      }
    },
    sass: {
      dist: {
        options: { // Target options
          sourceMap : false ,
          style: "compressed",
          compass: true,

        },
        files: [{
          expand: true,
          cwd: "source/scss",
          src: ["**/*.scss"],
          dest: "public/css",
          ext: '.min.css'
        }]
      },
      mix: {
        options: { // Target options
          sourceMap : false ,
          style: "compressed",
          compass: true,

        },
        files: [{
          expand: true,
          cwd: "source/mix",
          src: ["**/*.scss"],
          dest: "public/mix",
          ext: '.min.css'
        }]
      }
    },
    // copy: {
    //   images: {
    //     expand: true,
    //     cwd: "./source/images/",
    //     src: "**",
    //     dest: "./public/images"
    //   },
    //   fonts: {
    //     expand: true,
    //     cwd: "./source/fonts/",
    //     src: "**",
    //     dest: "./public/fonts"
    //   },
    //   javascript: {
    //     expand: true,
    //     cwd: "./source/javascript/libs/",
    //     src: "**",
    //     dest: "./public/js/libs"
    //   }
    // },
    watch: {
      // html: {
      //   files: ['**'],
      //   tasks: [],
      //   options: {
      //     livereload: LIVERELOAD_PORT
      //   }
      // },
      // jade: {
      //   files: ['source/jade/*.jade'],
      //   tasks: ["newer:jade"],
      //   options: {
      //     livereload: LIVERELOAD_PORT
      //   }
      // },
      sass: {
        files: ['source/scss/**/*.scss','source/mix/**/*.scss'], 
        tasks: "sass",
      },
      js: {
        files: ['source/js/**/*.js','source/mix/**/*.js'],
        tasks:  "uglify",
        // options: {
        //   livereload: LIVERELOAD_PORT
        // }
      }
    }
  });

  // 载入插件
  // grunt.loadNpmTasks('grunt-contrib-livereload');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-newer');
  // grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [  'watch']);
}