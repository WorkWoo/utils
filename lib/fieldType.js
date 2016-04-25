// Custom Modules
var log = require('./logger.js');
var widget = 'fieldType';
log.registerWidget(widget);

exports.getFieldTypesObject = function () {

	var fieldTypesArray = this.getFieldTypesArray();

	var fieldTypesObject = {};

	for (var i = 0 ; i < fieldTypesArray.length; ++i) {
		fieldTypesObject[fieldTypesArray[i].value] = fieldTypesArray[i];
	}

	return fieldTypesObject;
};

exports.getFieldTypesArray = function () {
	var fieldTypes = [
		{ value: 'text', label: 'Single-Line Text', dbType: 'String' },
		{ value: 'textarea', label: 'Multi-Line Text', dbType: 'String' },
		{ value: 'checkbox', label: 'Checkbox', dbType: 'boolean' },
		{ value: 'datetime', label: 'Date/Time', dbType: 'Date' },
		{ value: 'phone', label: 'Phone Number', dbType: 'String' },
		{ value: 'currency', label: 'Currency', dbType: 'String' },
		{ value: 'choice', label: 'Dropdown', dbType: 'String' },
		{ value: 'SingleUserReference', label: 'User (Pro only)', dbType: 'ObjectId', ref: 'users', isPro: true },
		{ value: 'ListUserReference', label: 'User Dropdown (Pro only)', dbType: 'ObjectId', ref: 'users', isPro: true },
		{ value: 'SingleItemReference', label: 'Item (Pro only)', dbType: 'ObjectId', isPro: true },
		{ value: 'ListItemReference', label: 'Item Dropdown (Pro only)', dbType: 'ObjectId', isPro: true }
	];

	return fieldTypes;

};