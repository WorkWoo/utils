var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attachmentSchema = new Schema({
	filename: { type: String },
	content: { type: Schema.Types.Mixed },
	path: { type: String },
	contentType: { type: String },
	created_at: Date,
	updated_at: Date,
	_created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    _updated_by: { type: Schema.Types.ObjectId, ref: 'User' }
});

attachmentSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.updated_at = currentDate;

	if (!this.created_at)
    	this.created_at = currentDate;

	next();
});

var Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;