var mkdirp = require('mkdirp');
var touch = require('touch');
var del = require('del');
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

// create some empty dirs (cannot check-in empty dirs to git)
mkdirp.sync('./test/tmp');
mkdirp.sync('./test/fixtures/empty');
mkdirp.sync('./test/fixtures/dir/.dotdir/empty');
mkdirp.sync('./test/fixtures/dir-copy/.dotdir/empty');

// change the times of alpha-copy.txt, so it will be equal, but not DEEP equal to alpha.txt
touch.sync('./test/fixtures/alpha-copy.txt', {time: '2016-01-01T00:00:00Z'});

// delete files that get created automatically by the OS (they mess-up directory listings)
del.sync('test/fixtures/**/.DS_Store', {dot: true});
del.sync('test/fixtures/**/Thumbs.db', {dot: true});

describe('initialized', function () {
	assert.isDirectory('./test/tmp');
	assert.isDirectory('./test/fixtures');
	assert.isDirectory('./test/fixtures/empty');
	assert.isDirectory('./test/fixtures/dir/.dotdir/empty');
	assert.isDirectory('./test/fixtures/dir-copy/.dotdir/empty');
});

describe('chai-fs', function () {
	it('exports module', function () {
		assert.isFunction(chai_fs, 'chai_fs export');
	});
});
