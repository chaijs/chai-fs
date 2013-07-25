# chai-fs

[![Build Status](https://secure.travis-ci.org/Bartvds/chai-fs.png?branch=master)](http://travis-ci.org/Bartvds/chai-fs) [![Dependency Status](https://gemnasium.com/Bartvds/chai-fs.png)](https://gemnasium.com/Bartvds/chai-fs) [![NPM version](https://badge.fury.io/js/chai-fs.png)](http://badge.fury.io/js/chai-fs)

[Chai](http://chaijs.com/) assertions for Node.js file system api.

Use `path` and synchronous `fs` to assert files and directories.

## Usage

### server-side

Install from npm:

    $ npm install chai-fs

Have chai use the chai-fs module:

    var chai = require('chai');
    chai.use(require('chai-fs'));

### browser-side

No `fs` and `path` (but browserify? phantomJS?)

## Assertions

	// bdd
	
	//path info 
	expect(path).to.have.dirname(name);
	expect(path).to.have.basename(name, ? ext);
	expect(path).to.have.extname(name);

	// type
	expect(path).to.exist.as.path;
	expect(path).to.exist.as.file;
	expect(path).to.exist.as.directory;
	
	// content
	expect(path).file.to.equal(dataOrRegExp);
	expect(path).directory.to.be.empty;
	
	// content by path
	expect(path).to.equal.file(otherPath);
	expect(path).to.deep.equal.file(otherPath); // + mtime, uid, gid
	
	// stat
	expect(path).to.have.size(size);
	expect(path).to.have.size(minSize, ? maxSize);
	
Some to add later:
	
	// stat
	expect(path).to.have.atime(date);
	expect(path).to.have.mtime(date);
	expect(path).to.have.ctime(date);

	expect(path).to.have.uid(id);
	expect(path).to.have.gid(id);

	// some ideas for later
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