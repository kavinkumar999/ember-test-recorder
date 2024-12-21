/* eslint-disable n/no-unpublished-require */
'use strict';
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const PostCSS = require('broccoli-postcss');
const CleanCSS = require('postcss-clean');

module.exports = {
  name: require('./package').name,

  treeForVendor(vendorTree) {
    const path = require('path');

    let cssTree = new Funnel(path.join(__dirname, 'addon/styles'), {
      files: ['**/*.css'],
      destDir: '/'
    });

    cssTree = new PostCSS(cssTree, {
      plugins: [
        {
          module: CleanCSS,
          options: {
            level: {
              1: {
                specialComments: 0
              }
            }
          }
        }
      ]
    });

    if (vendorTree) {
      return new MergeTrees([vendorTree, cssTree]);
    }

    return cssTree;
  }
};
