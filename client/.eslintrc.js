module.exports = {
  parser: 'babel-eslint',

  extends: '../.eslintrc.js',

  env: {
    browser: true,
    node: false,
    es6: true
  },

  parserOptions: {
    ecmaFeatures: {
      modules: true
    }
  }
}
