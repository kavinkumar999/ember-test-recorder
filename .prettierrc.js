'use strict';

module.exports = {
  overrides: [
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
        trailingComma: 'none',
        parser: 'flow',
        printWidth: 120
      }
    }
  ]
};
