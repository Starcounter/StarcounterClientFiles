module.exports = function(grunt) {

    grunt.initConfig({
        bump: {
          options: {
            files: ['bower.json', 'palindrom-error-catcher.html'],
            commit: true,
            commitMessage: '%VERSION%',
            commitFiles: ['bower.json', 'palindrom-error-catcher.html'],
            createTag: true,
            tagName: '%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            globalReplace: false,
            prereleaseName: false,
            regExp: false
          }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('default', ['watch']);

};
