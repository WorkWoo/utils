// Config
var cfg = require('../config/config');

var utility = require('../lib/utility');

var request = require('request');
var j = request.jar();
var btoa = require('btoa');

run();

function finishTest() {
	process.exit();
}

function run() {
	if (process.argv.length < 3) {
		console.log('Test Type required: node endPointTester.js [Test Type] [Test Arguments]');
		process.exit();
	} else {
		var testType = process.argv[2];

		switch (testType) {
			case 'auth' : testAuthentication(); break;
			case 'fp' : testForgotPassword(); break;
			case 'rp' : testResetPassword(); break;
			case 'ua' : testUpdateMyAccount(); break;
			default : console.log('Invalid test type: ' + testType); process.exit();break;
		}
	}

}

function testAuthentication() {
	if (process.argv.length < 5) {
		console.log('Email Address and Password required: node endPointTester.js auth [emailAddress] [password]');
		process.exit();
	}

	var emailAddress = process.argv[3];
	var password = process.argv[4];

	console.log("Logging in with " + emailAddress + ":" + password);

	logIn(emailAddress, password, logOut);
}

function logIn(emailAddress, password, callback) {
	request({
		url: cfg.auth.url + "/login",
		method: "POST",
		withCredentials: true,
		headers: {
			Authorization: 'Basic ' + btoa(emailAddress + ":" + password),
		},
		jar: j
	}, function(error, response, body) {
		console.log("Response to logIn: " + body);
		var cookie_string = j.getCookieString(cfg.auth.url + '/login'); 
		if (cookie_string) {
			console.log(cookie_string);
			callback(emailAddress);
		} else {
			finishTest();
		}
		
	});
}

function logOut(emailAddress) {
	request({
		url: cfg.platform.url + "logout",
		method: "GET",
		withCredentials: true,
		jar: j
	}, function(error, response, body) {
		//console.log("Response to logout: " + body);
		finishTest();
	});
};

function testForgotPassword() {
	if (process.argv.length < 4) {
		console.log('Email Address required: node endPointTester.js fp [emailAddress]');
		process.exit();
	}

	var emailAddress = process.argv[3];

	console.log("Executing forgot password with " + emailAddress);

	forgotPassword(emailAddress, finishTest);
}

function forgotPassword(emailAddress, callback) {
	var data = {};
	data.emailAddress = emailAddress;

	request({
		url: cfg.auth.url + "/forgotPwd",
		method: "POST",
		json: true,
		body: data,
		withCredentials: true,
		jar: j
	}, function(error, response, body) {
		console.log("Response to forgot password: ");
		utility.logObject(body);
		console.log("Check your email for token if successful");
		callback();
	});
};

function testResetPassword() {
	if (process.argv.length < 5) {
		console.log('New password and token required: node endPointTester.js fp [new password] [token]');
		process.exit();
	}

	var newPassword = process.argv[3];
	var token = process.argv[4];

	console.log("Executing reset password with " + newPassword + ":" + token);

	resetPassword(newPassword, token, finishTest);
}

function resetPassword(newPassword, token, callback) {
	var data = {};
	data.newPassword = newPassword;
	data.token = token;

	request({
		url: cfg.auth.url + "/resetPwd",
		method: "POST",
		json: true,
		body: data,
		withCredentials: true,
		jar: j
	}, function(error, response, body) {
		console.log("Response to reset password: " + body);
		utility.logObject(body);
		callback();
	});
};

function testUpdateMyAccount() {
	if (process.argv.length < 5) {
		console.log('Email Address and Password required: node endPointTester.js ua [emailAddress] [password]');
		process.exit();
	}

	var emailAddress = process.argv[3];
	var password = process.argv[4];

	console.log("Logging in with " + emailAddress + ":" + password);

	logIn(emailAddress, password, updateMyAccount);
}

function updateMyAccount(emailAddress) {
	console.log("Update account for " + emailAddress);
	
	var data = {};
	data.user = {};
	data.user.firstName = 'endPoint6';
	data.user.lastName = '';
	data.user.emailAddress = 'rmangroo@gmail.com';
	data.user.phone = '(646) 573-6729';

	data.org = {};
	data.org.name = 'endPointTester Corp.';
	data.org.phone = '1 800-573-6729';

	request({
		url: cfg.platform.url + "updateMyAccount",
		method: "POST",
		json: true,
		body: data,
		withCredentials: true,
		jar: j
	}, function(error, response, body) {
		console.log("Response to update account: " + body);
		utility.logObject(body);
		logOut();
	});

}














