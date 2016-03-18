var config = require('./config.global');

config.env = 'stage';
config.hostname = 'appstage.workwoo.com';

//Authentication app
config.auth = {};
config.auth.url = 'http://authstage.workwoo.com';

//Platform app
config.platform = {};
config.platform.url = 'http://appstage.workwoo.com/';

module.exports = config;