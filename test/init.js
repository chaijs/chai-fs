var mkdirp = require('mkdirp');
var touch = require('touch');
var _ = require('underscore');

var chai_fs = require('../lib/index');

var chai = require('chai');
chai.config.includeStack = true;
chai.should();
chai.use(chai_fs);
chai.use(require('chai-json-schema'));

//var expect = chai.expect;
var assert = chai.assert;

// import assertion multi tester
require('./tester')(chai, _);

before(function () {
	// create some empty dirs (cannot check-in empty dirs to git)
	mkdirp.sync('./test/fixtures/empty');
	mkdirp.sync('./test/tmp');

	assert.isDirectory('./test/fixtures');
	assert.isDirectory('./test/fixtures/empty');
	assert.isDirectory('./test/tmp');

	// Change the times of alpha-copy.txt, so it will be equal, but not DEEP equal to alpha.txt
	touch.sync('./test/fixtures/alpha-copy.txt', {time: '2016-01-01T00:00:00Z'});
});

describe('chai-fs', function () {
	it('exports module', function () {
		assert.isFunction(chai_fs, 'chai_fs export');
	});
});
