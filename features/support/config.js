/**
 * Load configuration from config.json.
 * 
 * @author Shin Feng
 * @date 2018.2.27
 * @version 1.0.0
 * 
 */

const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'test';
const envConfig = config.environment[env];

for ( var param in envConfig) {
	config[param] = envConfig[param];
}

module.exports = config;