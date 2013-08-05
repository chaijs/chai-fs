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
					, 'failed correctly, but expected message #{act} to equal #{exp}'
					, 'failed correctly, but expected message #{act} to not equal #{exp}'
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

	var pass = function (type, styles, params) {
		_.each(styles, function (style, styleName) {
			if (!style.hasOwnProperty(type)) {
				throw( new Error('no assertion type ' + type));
			}
			var t = style[type];
			describe(styleName, function () {
				if (_.isFunction(t)) {
					it('basic', function () {
						t(params);
					});
				}
				else {
					_.each(t, function (variation, label) {
						var call = _.isFunction(variation) ? variation : variation.call;
						it(label, function () {
							call(params);
						});
					});
				}
			});
		});
	};

	var fail = function (type, styles, params) {
		if (!params.hasOwnProperty('report')) {
			throw( new Error('no report param'));
		}

		var report = _.template(params.report, params);

		_.each(styles, function (style, styleName) {
			if (!style.hasOwnProperty(type)) {
				throw( new Error('no assertion type ' + type));
			}

			describe(styleName, function () {
				var t = style[type];
				if (_.isFunction(t)) {
					it('basic', function () {
						expect(function () {
							t(params);
						}).to.fail(report);
					});
				}
				else {
					_.each(t, function (variation, label) {
						it(label, function () {
							var rep = variation.msg ? params.msg + ': ' + report : report;
							var call = _.isFunction(variation) ? variation : variation.call;
							expect(function () {
								call(params);
							}).to.fail(rep);
						});
					});
				}
			});
		});
	};

	chai.getStyleTest = function (styles, def) {

		return {
			valid: function (params) {
				params = _.defaults(_.clone(params), def);

				if (!params.hasOwnProperty('msg')) {
					throw( new Error('no msg param'));
				}

				describe('valid expectation', function () {
					describe('pass', function () {
						pass('base', styles, params);
					});
					describe('fail negation', function () {
						fail('negate', styles, params);
					});
				});
			},
			invalid: function (params) {
				params = _.defaults(_.clone(params), def);

				if (!params.hasOwnProperty('msg')) {
					throw( new Error('no msg param'));
				}

				describe('invalid expectation', function () {
					describe('fail', function () {
						fail('base', styles, params);
					});
					describe('pass negation', function () {
						pass('negate', styles, params);
					});
				});
			}
		};
	};

	it('exports module', function () {
		assert.isFunction(chai_fs, 'chai_fs export');
	});
});