// Custom Modules
var log = require('./logger.js');
var widget = 'collectionType';
log.registerWidget(widget);

exports.getCollectionTypesObject = function () {

	var collectionTypesArray = this.getCollectionTypesArray();

	var collectionTypesObject = {};

	for (var i = 0 ; i < collectionTypesArray.length; ++i) {
		collectionTypesObject[collectionTypesArray[i].label] = collectionTypesArray[i];
	}

	return collectionTypesObject;
};

exports.getCollectionTypesArray = function () {
	var collectionTypes = [];
	collectionTypes.push(getDefaultWorkableCollection());

	return collectionTypes;
};

function getDefaultWorkableCollection() {
	var workableCollection = {};
	workableCollection.label = 'Workable';

	var defaults = {};
	defaults.collectionType = 'workable';
	defaults.name = 'Workable Items';
	defaults.pluralLabel = 'Workable Items';
	defaults.singleLabel = 'Workable Item';
	defaults.icon = 'fa-wrench';
	defaults.stateChoices = ['Open', 'In Progress', 'Complete', 'Cancelled'];

	var defaultFields = [];

	defaultFields.push({ 'displayType': 'autonumber', 'label': 'Number', 'name': 'number', 'dbType': 'String', 'showOnNew': false, 'showOnView': false, 'showOnList': true, 'required': true, 'readonly': false, 'sysProvided': true });
	defaultFields.push({ 'displayType': 'state', 'label': 'State', 'choices': [], 'name': 'state', 'dbType': 'String', 'showOnNew': false, 'showOnView': false, 'showOnList': true, 'required': true, 'readonly': false, 'sysProvided': true });
	defaultFields.push({ 'displayType': 'text', 'label': 'Title', 'choices': [], 'name': 'title', 'dbType': 'String', 'showOnNew': true, 'showOnView': true, 'showOnList': true, 'required': true, 'readonly': false, 'sysProvided': false });

	defaults.fields = defaultFields;
	workableCollection.defaults = defaults;

	return workableCollection;
}

/*
name: { type: String, required: true },
 	collectionType: { type: String, required: true },
 	displayField: { type: String, required: true },
	singleLabel: { type: String, required: true },
	pluralLabel: { type: String, required: true },
	numberPrefix: { type: String, required: true },
	icon: { type: String, required: true },
	listColumnCount: { type: Number, required: true },
	referenceFields: { type: String, required: false },
	stateChoices: { type: [String], required: false },

*/