describe('chai-fs', function () {

	var chai = require('chai');
	chai.Assertion.includeStack = true;

	var chai_fs = require('../index');

	chai.use(require('../index'));
	chai.should();

	var assert = chai.assert;
	var expect = chai.expect;
	var mkdirp = require('mkdirp');
	var _ = require('underscore');

	chai.use(function (chai, utils) {
		//var objDisplay = utils.objDisplay;
		var inspect = utils.inspect;

		chai.Assertion.addMethod('fail', function (message) {
			var obj = this._obj;

			new chai.Assertion(obj).is.a('function');

			try {
				obj();
			}
			catch (err) {
				this.assert(
					err instanceof chai.AssertionError
					, 'expected #{this} to fail, but it threw ' + inspect(err)
					, 'expected #{this} to not fail, but it threw ' + inspect(err)
				);
				this.assert(
					err.message === message
					, 'failed but expected message #{act} to equal #{exp}'
					, 'failed but expected message #{act} to not equal #{exp}'
					, message
					, err.message
				);
				return;
			}
			this.assert(false, 'expected #{this} to fail');
		});
	});

	before(function (done) {
		// create an empty dir (cannot check-in empty dirs to git)
		mkdirp('./test/fixtures/empty', function (err) {
			if (err) {
				return done(err);
			}
			done();
		});
	});

	// assert a passing test using all styles
	var pass = function (type, styles, params) {
		_.each(styles, function (style, styleName) {
			if (!style.hasOwnProperty(type)) {
				throw( new Error('no assertion type ' + type));
			}
			var t = style[type];

			// simple non-nested call with no label or msg
			if (_.isFunction(t)) {
				it(styleName, function () {
					t(params);
				});
			}
			else {
				// nested call with sub label
				_.each(t, function (variation, label) {
					// simple call or object with .call and some options
					var call = _.isFunction(variation) ? variation : variation.call;
					it(styleName + ' ' + label, function () {
						call(params);
					});
				});
			}
		});
	};

	// assert a failing test using all styles
	var fail = function (type, styles, params) {
		if (!params.hasOwnProperty('report')) {
			throw( new Error('no report param'));
		}

		var report = _.template(params.report, params);

		_.each(styles, function (style, styleName) {
			if (!style.hasOwnProperty(type)) {
				throw( new Error('no assertion type ' + type));
			}
			var t = style[type];

			// simple non-nested call with no label or msg
			if (_.isFunction(t)) {
				it(styleName, function () {
					expect(function () {
						t(params);
					}).to.fail(report);
				});
			}
			else {
				// nested call with sub label
				_.each(t, function (variation, label) {
					it(styleName + ' ' + label, function () {
						// simple call or object with .call and some options
						var rep = variation.msg ? params.msg + ': ' + report : report;
						var call = _.isFunction(variation) ? variation : variation.call;
						expect(function () {
							call(params);
						}).to.fail(rep);
					});
				});
			}
		});
	};

	// get wrappers test main scenarios with all styles including negations
	chai.getStyleTest = function (styles, def) {

		// keep it dry
		var wrap = function (func) {
			return function (params) {
				params = _.defaults(_.clone(params), def);
				if (!params.hasOwnProperty('value')) {
					throw( new Error('no value param'));
				}
				if (!params.hasOwnProperty('msg')) {
					throw( new Error('no msg param'));
				}
				var label = params.label ? ' (' + params.label + ')' : '';

				func(label, params);
			};
		};

		return {
			valid: wrap(function (label, params) {
				describe('valid expectation' + label, function () {
					describe('should pass', function () {
						pass('base', styles, params);
					});
					describe('should fail when negated', function () {
						fail('negate', styles, params);
					});
				});
			}),
			invalid: wrap(function (label, params) {
				describe('invalid expectation' + label, function () {
					describe('should fail', function () {
						fail('base', styles, params);
					});
					describe('should pass when negated', function () {
						pass('negate', styles, params);
					});
				});
			}),
			// an expectation with invalid data will always fail on pre-tests (even when negated)
			error: wrap(function (label, params) {
				describe('invalid data' + label, function () {
					describe('should fail', function () {
						fail('base', styles, params);
					});
					describe('should fail when negated', function () {
						fail('negate', styles, params);
					});
				});
			})
		};
	};

	it('exports module', function () {
		assert.isFunction(chai_fs, 'chai_fs export');
	});
});