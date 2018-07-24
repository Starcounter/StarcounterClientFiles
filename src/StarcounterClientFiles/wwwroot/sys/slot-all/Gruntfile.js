module.exports = function(grunt) {

    grunt.initConfig({
        bump: {
          options: {
            files: ['package.json', 'bower.json', 'slot-all.html'],
            commit: true,
            commitMessage: '%VERSION%',
            commitFiles: ['package.json', 'bower.json', 'slot-all.html'],
            createTag: true,
            tagName: '%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            // pushTo: 'origin',
            globalReplace: false,
            prereleaseName: false,
            regExp: false
          }
        }
    });
;
    grunt.loadNpmTasks('grunt-bump');

};
