var config = module.exports = {};

config.env = 'development';

//mongo database
config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'mongodb://heroku_r235lts9:nthn5e0gqvdl37qajcq2b0gif9@ds037244.mongolab.com:37244/heroku_r235lts9';
config.mongo.poolSize = 10;
config.mongo.keepAlive = 120; //milliseconds

//mailer
config.mailer = {};
config.mailer.user = 'support@workwoo.com';
config.mailer.pass = 'w3c@n7b3s70pp3d.*1';
config.mailer.from = 'WorkWoo <support@workwoo.com>';
config.mailer.replyTo = 'WorkWoo <support@workwoo.com>';

// Cache
config.cache = {};
config.cache.checkPeriod = 300; // 5 Minutes
config.cache.longTTL = 7200; // 2 hours
config.cache.mediumTTL = 3600; // 1 hour
config.cache.shortTTL = 1800; // 30 Minutes

