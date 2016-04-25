var fieldTypes = require('../lib/fieldType').getFieldTypes();


for (var prop in fieldTypes) {
	console.log(prop + ' - ' + fieldTypes[prop].label + ' - ' + fieldTypes[prop].dbType);
}