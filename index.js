module.exports = function (chai, utils) {
	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	//var fs = require('fs');
	var path = require('path');

	Assertion.addMethod('basename', function (expected, msg) {
		if (msg) {
			flag(this, 'message', msg);
		}

		var obj = this._obj;

		new chai.Assertion(obj, 'actual').is.a('string');
		new chai.Assertion(expected, 'expected').is.a('string');

		var actual = path.basename(obj);
		var pass = path.basename(obj) === expected;

		this.assert(
			pass
			, "expected #{this} to have basename #{exp} but got #{act}"
			, "expected #{this} not to have basename #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.basename = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.have.basename(exp);
	};
	assert.notBasename = function (val, exp, msg) {
		new chai.Assertion(val, msg).to.not.have.basename(exp);
	};

};
