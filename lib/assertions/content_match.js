module.exports = function (chai, utils) {

	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	var fs = require('fs');

	//-------------------------------------------------------------------------------------------------------------

	//TODO add (utf8, base64, etc) flag chain props
	//TODO add Buffer compare/diff

	Assertion.addMethod('content_that_match', function (expected, msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}

		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(obj, preMsg + 'value').to.be.a.path();
		new chai.Assertion(obj, preMsg + 'value').to.be.a.file();

		new chai.Assertion(expected, preMsg + 'expected-value').is.an.instanceof(RegExp);

		var content = fs.readFileSync(obj, 'utf8');

		var pass = content.match(expected);

		this.assert(
			pass
			, "expected #{this} to have content that match #{exp} but got #{act}"
			, "expected #{this} not to have content that match #{exp}"
			, expected
			, content
		);
	});
	assert.fileContentMatch = function (val, exp, msg) {
		new chai.Assertion(val).to.have.content_that_match(exp, msg);
	};
	assert.notFileContentMatch = function (val, exp, msg) {
		new chai.Assertion(val).to.not.have.content_that_match(exp, msg);
	};
};
