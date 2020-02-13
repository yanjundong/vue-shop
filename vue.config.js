const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': path.join(__dirname, 'src/assets'),
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}