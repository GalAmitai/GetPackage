const config = require('../configuration/config');

class Logger {

    static async log(text) {
        try {
            if(config.environment.status !== 'dev') {
                // Connect to 3d party service for logging
            }
            console.log(`[${new Date().toLocaleString()}][LOG] - ${text}`)
        } catch(e) {
            console.log(e);
        }
    }

    static async error(text) {
        try {
            if(config.environment.status !== 'dev') {
                // Connect to 3d party service for logging
            }
            console.log(`[${new Date().toLocaleString()}][ERROR] - ${text}`)
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = Logger;