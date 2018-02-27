/**
 * Define the functions in custom world.
 * 
 * @author Shin Feng
 * @date 2018.2.27
 * @version 1.0.0
 * 
 */
 
const fs = require('fs');
const config = require('./config.js');
const httpUtil = require('./httpUtil.js');

const { setWorldConstructor } = require('cucumber');

function CustomWorld() {
	
};

CustomWorld.prototype.api = null;
CustomWorld.prototype.data = null;

CustomWorld.prototype.setApi = function(api) {
	this.api = api;
};

CustomWorld.prototype.setData = function(data) {
	this.data = data;
};

CustomWorld.prototype.readFile = function(file) {
	this.data = fs.readFileSync(__dirname + "/../data/" + file, "utf-8");
};

CustomWorld.prototype.sendRequest = function(type, callback) {
	new httpUtil().sendRequest(this.api, this.data, type, callback);
};

CustomWorld.prototype.verifyResponse = function(response) {
	if (global.response != response) {
		throw new Error(config['exception']['verify_response_failed']);
	}
};

CustomWorld.prototype.verifyJsonResponseParam = function(param, value) {
	var responseJson = null;
	try {
		responseJson = JSON.parse(global.response);
		if (responseJson[param] != value) {
			throw config['exception']['verify_response_failed'];
		}
	} catch(e) {
		if (e == config['exception']['verify_response_failed']) {
			throw new Error(`Verify parameter "${param}" failed! Expected value is ${value}. Actual value is ${responseJson[param]}.`);
		} else {
			throw new Error(config['exception']['response_is_not_a_json']);
		}
	}
};

setWorldConstructor(CustomWorld);