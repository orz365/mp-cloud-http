var log4js = require('log4js');
var logger = log4js.getLogger();

logger.level = 'debug'

log4js.configure({
    appenders: {
        cheese: {
            type: 'dateFile',
            filename: 'cheese.log'
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'debug'
        }
    }
});


module.exports = logger;