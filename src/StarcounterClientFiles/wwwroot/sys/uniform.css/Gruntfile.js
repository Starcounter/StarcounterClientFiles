module.exports = function(grunt) {
  grunt.initConfig({
    bump: {
      options: {
        files: [
          'package.json',
          'components/uni-date-picker/uni-date-picker.html',
          'components/uni-data-table/uni-data-table.html',
          'components/uni-data-table/uni-data-table.html',
          'components/uni-form-item-group/uni-form-item-group.html',
          'components/uni-pagination/uni-pagination.html'
        ],
        commit: true,
        commitMessage: '%VERSION%',
        commitFiles: [
          'package.json',
          'components/uni-date-picker/uni-date-picker.html',
          'components/uni-data-table/uni-data-table.html',
          'components/uni-data-table/uni-data-table.html',
          'components/uni-form-item-group/uni-form-item-group.html',
          'components/uni-pagination/uni-pagination.html'
        ],
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
