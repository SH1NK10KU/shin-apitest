/**
 * Define the steps in the sample.
 * 
 * @author Shin Feng
 * @date 2018.2.27
 * @version 1.0.0
 * 
 */

const { Given, When, Then } = require('cucumber');

Given(/^a request data: (.*) for (.*) interface$/, function(data, api) {
	this.setApi(api);
	this.setData(data);
});

Given(/^a request data from "(.*)" for (.*) interface$/, function(file, api) {
	this.setApi(api);
	this.readFile(file);
});

When(/^I send a (.*) request$/, function(type, callback) {
	this.sendRequest(type, callback);
});

Then(/^the response should be (.*)$/, function(response) {
	this.verifyResponse(response);
});

Then(/^the response "(.*)" should be (.*)$/, function(param, value) {
	this.verifyJsonResponseParam(param, value);
});

Given(/^(.*)接口：发送数据“(.*)”$/, function(api, data) {
	this.setApi(api);
	this.setData(data);
});

Given(/^(.*)接口：发送数据从文件“(.*)”$/, function(api, file) {
	this.setApi(api);
	this.readFile(file);
});

When(/^发送(.*)请求$/, function(type, callback) {
	this.sendRequest(type, callback);
});

Then(/^响应应为：(.*)$/, function(response) {
	this.verifyResponse(response);
});

Then(/^响应参数“(.*)”应为：(.*)$/, function(param, value) {
	this.verifyJsonResponseParam(param, value);
});