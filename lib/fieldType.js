// Custom Modules
var log = require('./logger.js');
var widget = 'fieldType';
log.registerWidget(widget);

exports.getFieldTypes = function () {
	var fieldTypes = {
		'text': { label: 'Single-Line Text', dbType: 'String' },
		'textarea': { label: 'Multi-Line Text', dbType: 'String' },
		'checkbox': { label: 'Checkbox', dbType: 'boolean' },
		'datetime': { label: 'Date/Time', dbType: 'Date' },
		'phone': { label: 'Phone Number', dbType: 'String' },
		'currency': { label: 'Currency', dbType: 'String' },
		'choice': { label: 'Dropdown', dbType: 'String' },
		'SingleUserReference': { label: 'User (Pro only)', dbType: 'ObjectId', ref: 'users', isPro: true },
		'ListUserReference': { label: 'User Dropdown (Pro only)', dbType: 'ObjectId', ref: 'users', isPro: true },
		'SingleItemReference': { label: 'Item (Pro only)', dbType: 'ObjectId', isPro: true },
		'ListItemReference': { label: 'Item Dropdown (Pro only)', dbType: 'ObjectId', isPro: true }
	};

	return fieldTypes;

};