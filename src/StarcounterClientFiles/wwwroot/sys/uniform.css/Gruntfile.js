module.exports = function(grunt) {

    grunt.initConfig({
        bump: {
          options: {
            files: ['package.json', 'uniform.css', 'components/uni-date-picker/uni-date-picker.html'],
            commit: true,
            commitMessage: '%VERSION%',
            commitFiles: ['package.json', 'uniform.css', 'components/uni-date-picker/uni-date-picker.html'],
            createTag: true,
            tagName: '%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            // pushTo: 'origin',
            globalReplace: false,
            prereleaseName: 'rc',
            regExp: false
          }
        }
    });

    grunt.loadNpmTasks('grunt-bump');


};
