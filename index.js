module.exports = function (chai, utils) {
	/* jshint -W030 */
	var Assertion = chai.Assertion;
	var flag = utils.flag;
	var assert = chai.assert;

	var fs = require('fs');
	var path = require('path');

	Assertion.addMethod('basename', function (expected, msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}
		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(expected, preMsg + 'expected-value').is.a('string');

		var actual = path.basename(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have basename #{exp} but got #{act}"
			, "expected #{this} not to have basename #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.basename = function (val, exp, msg) {
		new chai.Assertion(val).to.have.basename(exp, msg);
	};
	assert.notBasename = function (val, exp, msg) {
		new chai.Assertion(val).to.not.have.basename(exp, msg);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('dirname', function (expected, msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}
		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(expected, preMsg + 'expected-value').is.a('string');

		var actual = path.dirname(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have dirname #{exp} but got #{act}"
			, "expected #{this} not to have dirname #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.dirname = function (val, exp, msg) {
		new chai.Assertion(val).to.have.dirname(exp, msg);
	};
	assert.notDirname = function (val, exp, msg) {
		new chai.Assertion(val).to.not.have.dirname(exp, msg);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('extname', function (expected, msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}
		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(expected, preMsg + 'expected-value').is.a('string');

		var actual = path.extname(obj);

		this.assert(
			actual === expected
			, "expected #{this} to have extname #{exp} but got #{act}"
			, "expected #{this} not to have extname #{exp} but got #{act}"
			, expected
			, actual
		);
	});
	assert.extname = function (val, exp, msg) {
		new chai.Assertion(val).to.have.extname(exp, msg);
	};
	assert.notExtname = function (val, exp, msg) {
		new chai.Assertion(val).to.not.have.extname(exp, msg);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('path', function (msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}

		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');

		var pass = fs.existsSync(obj);

		this.assert(
			pass
			, "expected #{this} to exist"
			, "expected #{this} not to exist"
		);
	});
	assert.pathExists = function (val, msg) {
		new chai.Assertion(val).to.be.a.path(msg);
	};
	assert.notPathExists = function (val, msg) {
		new chai.Assertion(val).to.not.be.a.path(msg);
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.overwriteProperty('empty', function (_super) {
		return function () {
			var obj = this._obj;
			var pass, test;

			if (flag(this, 'fs.isDirectory') === true) {

				pass = fs.readdirSync(obj).length === 0;
				test = new Assertion(obj, flag(this, 'message'));

				//TODO verify this if/else makes sense
				if (flag(this, 'negate')){
					test.assert(
						!pass
						, "expected #{this} not to be an empty directory"
						, "expected #{this} to be an empty directory"
					);
				}
				else {
					test.assert(
						pass
						, "expected #{this} to be an empty directory"
						, "expected #{this} not to be an empty directory"
					);
				}
			} else if (flag(this, 'fs.isFile') === true) {

				pass = fs.statSync(obj).size === 0;
				test = new Assertion(obj, flag(this, 'message'));

				//TODO verify this if/else makes sense
				if (flag(this, 'negate')){
					test.assert(
						!pass
						, "expected #{this} not to be an empty file"
						, "expected #{this} to be an empty file"
					);
				}
				else {
					test.assert(
						pass
						, "expected #{this} to be an empty file"
						, "expected #{this} not to be an empty file"
					);
				}
			} else {
				_super.call(this);
			}
		};
	});

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('file', function (msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}

		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(obj, preMsg + 'value').to.be.a.path();

		var pass = fs.statSync(obj).isFile();

		flag(this, 'fs.isFile', pass);

		this.assert(
			pass
			, "expected #{this} to be a file"
			, "expected #{this} not to be a file"
		);
	});
	assert.isFile = function (val, msg) {
		new chai.Assertion(val).to.be.a.file(msg);
	};
	assert.notIsFile = function (val, msg) {
		new chai.Assertion(val).to.not.be.a.file(msg);
	};

	assert.isEmptyFile = function (val, msg) {
		new chai.Assertion(val).to.be.a.file(msg).and.empty;
	};
	assert.notIsEmptyFile = function (val, msg) {
		new chai.Assertion(val).to.be.a.file(msg).and.not.empty;
	};

	//-------------------------------------------------------------------------------------------------------------

	Assertion.addMethod('directory', function (msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}

		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(obj, preMsg + 'value').to.be.a.path();

		var pass = fs.statSync(obj).isDirectory();

		flag(this, 'fs.isDirectory', pass);

		this.assert(
			pass
			, "expected #{this} to be a directory"
			, "expected #{this} not to be a directory"
		);
	});
	assert.isDirectory = function (val, msg) {
		new chai.Assertion(val).to.be.a.directory(msg);
	};
	assert.notIsDirectory = function (val, msg) {
		new chai.Assertion(val).to.not.be.a.directory(msg);
	};

	assert.isEmptyDirectory = function (val, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.empty;
	};
	assert.notIsEmptyDirectory = function (val, msg) {
		new chai.Assertion(val).to.be.a.directory(msg).and.not.empty;
	};

	//-------------------------------------------------------------------------------------------------------------

	//TODO add (utf8, base64, etc) flag chain props
	//TODO add Buffer comapre/diff

	Assertion.addMethod('content', function (expected, msg) {
		var preMsg = '';
		if (msg) {
			flag(this, 'message', msg);
			preMsg = msg + ': ';
		}

		var obj = this._obj;

		new chai.Assertion(obj, preMsg + 'value').is.a('string');
		new chai.Assertion(obj, preMsg + 'value').to.be.a.path();
		new chai.Assertion(obj, preMsg + 'value').to.be.a.file();

		new chai.Assertion(expected, preMsg + 'expected-value').is.a('string');

		var content = fs.readFileSync(obj, 'utf8');

		var pass = content === expected;

		this.assert(
			pass
			, "expected #{this} to have content #{exp} but got #{act}"
			, "expected #{this} not to have content #{exp}"
			, expected
			, content
		);
	});
	assert.fileContent = function (val, exp, msg) {
		new chai.Assertion(val).to.have.content(exp, msg);
	};
	assert.notFileContent = function (val, exp, msg) {
		new chai.Assertion(val).to.not.have.content(exp, msg);
	};
};
