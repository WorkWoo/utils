// Config
var cfg = require('../../config/config');

// Logger
var log = require('../logger');
var widget = 'counter';
log.registerWidget(widget);

//Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
	seq: { type: Number, default: 1000 },
 	prefix: { type: String, required: true },
 	collection: { type: String, required: true },
	_org: { type: Schema.Types.ObjectId, ref: 'Org' },
	_created_by: { type: Schema.Types.ObjectId, ref: 'User' }
}, cfg.mongoose.options);

counterSchema.virtual('autonumber').get(function () {
	return this.prefix + this.seq;
});

counterSchema.statics.increment = function(collectionName, org, callback) {
	try {
		this.findOneAndUpdate({collection: collectionName, _org: org}, {$inc: { seq: 1} }, {new: true}, function(error, counter)	{
        	if(error)
            	return callback(error);
        	callback(null, counter.autonumber);
    	});

	} catch (error) {
		log.error('|Counter.increment| Unknown -> ' + error, widget);
		return callback(error, false);
	}
};

var Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;