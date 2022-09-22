const path = require('path');

module.exports = function(env, argv) {
  return {
    entry: './scripts/module/main.js',

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'scripts'),
    },

    mode: env.production ? 'production': 'development',
    watch: env.production ? false : true,
  }
}