const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-preset-env')(),
        process.env.NODE_ENV === 'production'
            ? purgecss({
                  content: [
                      './src/js/**/*.js',
                      './src/js/**/*.vue',
                  ],
                  extractors: [
                      {
                          extractor: class {
                              static extract(content) {
                                  return content.match(/[a-zA-Z0-9-:_/]+/g) || [];
                              }
                          },
                          extensions: ['js', 'vue'],
                      },
                  ],
                  whitelistPatterns: [/html/, /hljs/, /sf-dump/, /theme-dark/, /theme-auto/],
              })
            : '',
    ],
};
