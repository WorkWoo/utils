// Config
var cfg = require('../config/config');

var request = require('request');
var j = request.jar();
var btoa = require('btoa');

var numTests = 1;
var executedTests = 0;

run();

function end() {
	setTimeout(function() { 
		if (numTests == executedTests) { 
			process.exit();
		} else {
			end();
		}
	}, 2000);
}

function run() {
	var emailAddress = process.argv.length > 2 && process.argv[2] ? process.argv[2] : 'rmangroo@gmail.com';
	var password = process.argv.length > 3 && process.argv[3] ? process.argv[3] : '123456';

	console.log("Logging in with " + emailAddress + ":" + password);

	logIn(emailAddress, password);
	end();
}

function logIn(username, password) {
	request({
		url: cfg.auth.url + "/login",
		method: "POST",
		withCredentials: true,
		headers: {
			Authorization: 'Basic ' + btoa(username + ":" + password),
		},
		jar: j
	}, function(error, response, body) {
		console.log("Response to logIn: " + body);
		var cookie_string = j.getCookieString(cfg.auth.url + '/login'); 
		console.log(cookie_string);
		executedTests++;
	});
}

function logOut() {
	request({
		url: cfg.platform.url + "/logout",
		method: "GET",
		withCredentials: true,
		jar: j
	}, function(error, response, body) {
		console.log("Response to logout: " + body);
		process.exit();
	});
}