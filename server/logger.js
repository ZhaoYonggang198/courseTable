const log4js = require('log4js');

log4js.configure({
    appenders: {
      out: { type: 'stdout' }
    },
    categories: {
      default: { appenders: [ 'out' ], level: 'debug' }
    }
});

exports.logger = function(name){
  var logger = log4js.getLogger(name);
  return logger;
};