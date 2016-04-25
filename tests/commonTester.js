var fieldTypes = require('../lib/fieldType').getFieldTypesObject();


for (var prop in fieldTypes) {
	console.log(prop + ' - ' + fieldTypes[prop].label + ' - ' + fieldTypes[prop].dbType);
}