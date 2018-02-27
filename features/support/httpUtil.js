/**
 * Define HTTPUtil for the sample.
 * 
 * @author Shin Feng
 * @date 2018.2.27
 * @version 1.0.0
 * 
 */

const http = require('http');
const qs = require('querystring');
const config = require('./config.js');

var HttpUtil = function() {

};

HttpUtil.prototype.host = config['server'].host;
HttpUtil.prototype.port = config['server'].port;
HttpUtil.prototype.type = config['http'].type;

HttpUtil.prototype.sendRequest = function(api, data, type, callback) {
	const token = config['settings'].token;
	var options = {};
	var body = JSON.parse(data);
	var response = '';
	
	// Replace the token if global.token has been set.
	if (body.hasOwnProperty(token)) {
		// if token has not been set
		if (body[token]['value'] == "" || body[token]['value'] == "undefined") {
			body[token]['value'] = global.token;
		}
	}

	// Initialize the options.
	options['host'] = this.host;
	options['port'] = this.port;
	options['path'] = config['api'][api];
	// Replace the parameter in the url for specific interface.
	for (var key in body) {
		if (data.indexOf(key) > 0 && options['path'].indexOf("{" + key +"}") > 0) {
			options['path'] = options['path'].replace("{" + key +"}", body[key]);
			delete body[key];
		}
	}

	// Set the headers for the request.
	options['headers'] = config['http']['headers'];
	if (body.hasOwnProperty(token) && body[token]['position'] == "header" && body[token]['value'] != "undefined" && body[token]['value'] != "") {
		options['headers'][token] = body[token]['value'];
	}

	// Set the method according to the type.
	options['method'] = type;
	if ('GET' == type || 'DELETE' == type || 'PUT' == type) {
		if (body.hasOwnProperty(token) && body[token]['position'] == "url") {
			body[token] = body[token]['value'];
			contents = qs.stringify(body);
			options['path'] += "?" + contents;
		} else if (!body.hasOwnProperty(token)) {
			contents = qs.stringify(body);
			options['path'] += "?" + contents;
		}
		contents = "";
	} else if ('POST' == type) {
		if (body.hasOwnProperty(token) && body[token]['position'] == "url") {
			options['path'] += "?" + token + "=" + body[token]['value'];
		}
		delete body[token];
		contents = qs.stringify(body);
	}

	options['headers']['Content-Length'] = contents.length;

	var req = http.request(options, function(res) {
		res.setEncoding(config['http']['encoding']);
		res.on('data', function(data) {
			response += data;
		});
		res.on('end', function() {
			// console.log(response);
			var getValueOfToken = function(json, key) {
				for (var property in json) {
					if (typeof(json[property]) != "object" && property == key) {
						global.token = json[property];
					} else if (HttpUtil.isJson(json[property])) {
						getValueOfToken(json[property], key);
					}
				}
			}
			if (!JSON.parse(data).hasOwnProperty(token)) {
				getValueOfToken(JSON.parse(response), token);
			}
			global.response = response;
			callback();
		});
	});
	req.write(contents);
	req.end();
};

HttpUtil.isJson = function(t) {
	return (typeof(t) == "object" && Object.prototype.toString.call(t).toLowerCase() == "[object object]" && !t.length);
};

module.exports = HttpUtil;