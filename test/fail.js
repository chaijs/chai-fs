
var chai = require('chai');
chai.Assertion.includeStack = true;

describe('fail demo', function () {

	var chai = require('chai');
	chai.Assertion.includeStack = true;

	chai.use(require('../index'));

	chai.should();
	//var expect = chai.expect;
	//var assert = chai.assert;

	// enable this to see the error reporting
	describe('failing test', function () {

	});
});
