/*global module*/
/*jslint node:true */
/*jshint strict:true */

module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            target: [
                "target/app/*.js",
                "target/app/model/",
                "target/app/rest/"
            ]
        },
        toffee: {
            options: {
                bare: true,
                join: false,
                sourceMap: true
            },
            "target/app/app.js": "src/main/toffee/app.toffee",
            "target/app/model/wine.js": "src/main/toffee/model/wine.toffee",
            "target/app/rest/rest.js": "src/main/toffee/rest/rest.toffee",
            "target/app/rest/rest_wines.js": "src/main/toffee/rest/rest_wines.toffee",
            "target/test/features/wines-steps.js": "src/test/features/wines-steps.toffee"
        },
        eslint: {
            options: {
                silent: false,
                ignore: false
            },
            src: [
                "target/app/**/*.js"
            ]
        },
        cucumberjs: {
            options: {
                steps: "target/test/features/",
                format: "html",
                output: "target/test/features/report.html",
                theme: "bootstrap",
                debug: false
            },
            features: [
                "src/test/features/wines.feature"
            ]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-toffee");
    grunt.loadNpmTasks("grunt-cucumberjs");
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.registerTask("compile", [
        "toffee"
    ]);
    grunt.registerTask("lint", [
        "eslint"
    ]);
    grunt.registerTask("test", [
        "cucumberjs"
    ]);
    grunt.registerTask("default", [
        "clean",
        "compile",
        "lint",
        "test"
    ]);
};
