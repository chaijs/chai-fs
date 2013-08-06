# chai-fs

[![Build Status](https://secure.travis-ci.org/Bartvds/chai-fs.png?branch=master)](http://travis-ci.org/Bartvds/chai-fs) [![Dependency Status](https://gemnasium.com/Bartvds/chai-fs.png)](https://gemnasium.com/Bartvds/chai-fs) [![NPM version](https://badge.fury.io/js/chai-fs.png)](http://badge.fury.io/js/chai-fs)

[Chai](http://chaijs.com/) assertions for Node.js file system api.

Uses `path` and synchronous `fs` to assert files and directories.

All assertions are available in `expect`, `should` and `assert` style, and support the optional, message parameter.

***Note:*** *This is a work in progress. The assertions may change at any time until the version is raised and things are published to NPM.*

## Usage

### server-side

Install from npm:

    $ npm install chai-fs

Have chai use the chai-fs module:

    var chai = require('chai');
    chai.use(require('chai-fs'));

### browser-side

No file system (but browserify? phantomJS? message me if you tried!)

## Path assertions

Wrappers around `require('path')`

### basename

Assert the return value of `path.basename(path)`

	expect(path).to.have.basename(name, ?msg);
	expect(path).to.not.have.basename(name, ?msg);
	
	path.should.have.basename(name, ?msg);
	path.should.not.have.basename(name, ?msg);

	assert.basename(path, name, ?msg);
	assert.notBasename(path, name, ?msg);

### dirname

Assert the return value of `path.dirname(path)`
	
	expect(path).to.have.dirname(name, ?msg);
	expect(path).to.not.have.dirname(name, ?msg);
	
	path.should.have.dirname(name, ?msg);
	path.should.not.have.dirname(name, ?msg);

	assert.dirname(path, name, ?msg);
	assert.notDirname(path, name, ?msg);

### extname

Assert the return value of `path.extname(path)`
	
	expect(path).to.have.extname(name, ?msg);
	expect(path).to.not.have.extname(name, ?msg);
	
	path.should.have.extname(name, ?msg);
	path.should.not.have.extname(name, ?msg);

	assert.extname(path, name, ?msg);
	assert.notExtname(path, name, ?msg);

## Existence assertions

### path

Assert if the path exists.
	
	expect(path).to.be.a.path(?msg);
	expect(path).to.not.be.a.path(?msg);
	
	path.should.be.a.path(?msg);
	path.should.not.be.a.path(?msg);

	assert.pathExists(path, ?msg);
	assert.notPathExists(path, ?msg);

Note: using Chai's `exists` chain would've been nice but gives issues with negations and the message parameter.

### file

Assert if the path exists and is a file.
	
	expect(path).to.be.a.file(?msg);
	expect(path).to.not.be.a.file(?msg);
	
	path.should.be.a.file(?msg);
	path.should.not.be.a.file(?msg);

	assert.pathIsFile(path, ?msg);
	assert.notPathIsFile(path, ?msg);


### directory

Assert if the path exists and is a directory.
	
	expect(path).to.be.a.directory(?msg);
	expect(path).to.not.be.a.directory(?msg);
	
	path.should.be.a.directory(?msg);
	path.should.not.be.a.directory(?msg);

	assert.pathIsDirectory(path,  ?msg);
	assert.notPathIsDirectory(path, ?msg);


## Coming up next

Some ideas for new assertions, exact format may change:

Priority
	
	// content
	expect(path).file.to.equal(dataOrRegExp);

	expect(path).directory.to.be.empty;
	
	// content by path
	expect(path).to.equal.file(otherPath);
	expect(path).to.deep.equal.file(otherPath); // + mtime, uid, gid
	
	// stat
	expect(path).to.have.size(size);
	expect(path).to.have.size(minSize, maxSize);
	
Some to add later:
	
	// stat
	expect(path).to.have.atime(date);
	expect(path).to.have.mtime(date);
	expect(path).to.have.ctime(date);

	expect(path).to.have.uid(id);
	expect(path).to.have.gid(id);

	// some ideas for later (interface with chai-date-time?)
	expect(path).to.have.atime.before(date);
	expect(path).to.have.mtime.before(date);
	expect(path).to.have.ctime.before(date);

	expect(path).to.have.atime.after(date);
	expect(path).to.have.mtime.after(date);
	expect(path).to.have.ctime.after(date);


## History

* 0.0.0 - Not released

## Build

Install development dependencies in your git checkout:

    $ npm install

You need the global [grunt](http://gruntjs.com) command:

    $ npm install grunt-cli -g

Build and run tests:

    $ grunt

See the `Gruntfile` for additional commands.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.