# chai-fs

[![Build Status](https://secure.travis-ci.org/Bartvds/chai-fs.png?branch=master)](http://travis-ci.org/Bartvds/chai-fs) [![Dependency Status](https://gemnasium.com/Bartvds/chai-fs.png)](https://gemnasium.com/Bartvds/chai-fs) [![NPM version](https://badge.fury.io/js/chai-fs.png)](http://badge.fury.io/js/chai-fs)

[Chai](http://chaijs.com/) assertions for Node.js file system api.

Uses `path` and synchronous `fs` to assert files and directories.

All assertions are available in `expect`, `should` and `assert` style, and support the optional, message parameter.

:warning: *This is a work in progress. The assertions may change at any time until the version is raised and things are published to NPM and the Chai plugin directory.*

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

### basename()

Assert the return value of `path.basename(path)`

````
expect(path).to.have.basename(name, ?msg);
expect(path).to.not.have.basename(name, ?msg);

path.should.have.basename(name, ?msg);
path.should.not.have.basename(name, ?msg);

assert.basename(path, name, ?msg);
assert.notBasename(path, name, ?msg);
````

### dirname()

Assert the return value of `path.dirname(path)`

````	
expect(path).to.have.dirname(name, ?msg);
expect(path).to.not.have.dirname(name, ?msg);

path.should.have.dirname(name, ?msg);
path.should.not.have.dirname(name, ?msg);

assert.dirname(path, name, ?msg);
assert.notDirname(path, name, ?msg);
````

### extname()

Assert the return value of `path.extname(path)`
	
````
expect(path).to.have.extname(name, ?msg);
expect(path).to.not.have.extname(name, ?msg);

path.should.have.extname(name, ?msg);
path.should.not.have.extname(name, ?msg);

assert.extname(path, name, ?msg);
assert.notExtname(path, name, ?msg);
````

## Fs assertions

### path()

Assert if the path exists.

* Uses `fs.existsSync()`.
* Making use of Chai's `exist` to chain would've been nice *but* has issues with negations and the message parameter.

````
expect(path).to.be.a.path(?msg);
expect(path).to.not.be.a.path(?msg);

path.should.be.a.path(?msg);
path.should.not.be.a.path(?msg);

assert.pathExists(path, ?msg);
assert.notPathExists(path, ?msg);
````

### directory()

Assert if the path exists and is a directory.
	
* Uses `fs.statSync().isDirectory()`

````
expect(path).to.be.a.directory(?msg);
expect(path).to.not.be.a.directory(?msg);

path.should.be.a.directory(?msg);
path.should.not.be.a.directory(?msg);

assert.isDirectory(path,  ?msg);
assert.notIsDirectory(path, ?msg);
````

### directory().and.empty

Assert if the path exists, is a directory and contains nothing. 

* Chains after `directory()`
* Uses `fs.readdirSync().length === 0`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `directory()`.
	
````
expect(path).to.be.a.directory(?msg).and.empty;
expect(path).to.be.a.directory(?msg).and.not.empty;

path.should.be.a.directory(?msg).and.empty;
path.should.be.a.directory(?msg).and.not.empty;

assert.isEmptyDirectory(path, ?msg);
assert.notIsEmptyDirectory(path, ?msg);
````

### file()

Assert if the path exists and is a file.

* Uses `fs.statSync().isFile()`
	
````
expect(path).to.be.a.file(?msg);
expect(path).to.not.be.a.file(?msg);

path.should.be.a.file(?msg);
path.should.not.be.a.file(?msg);

assert.isFile(path, ?msg);
assert.notIsFile(path, ?msg);
````

### file().and.empty

Assert if the path exists, is a file and contains nothing. 

* Chains after `file()`
* Uses `fs.statSync().size === 0`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `file()`.

````
expect(path).to.be.a.file(?msg).and.empty;
expect(path).to.be.a.file(?msg).and.not.empty;

path.should.be.a.file(?msg).and.empty;
path.should.be.a.file(?msg).and.not.empty;

assert.isEmptyFile(path, ?msg);
assert.notIsEmptyFile(path, ?msg); 
````

### file().with.json

Assert if the path exists, is a file and contains json parsable text. 

* Chains after `file()`
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `file()`.
* The `with` chain is just sugar.

````
expect(path).to.be.a.file(?msg).with.json;
expect(path).to.be.a.file(?msg).with.not.json;

path.should.be.a.file(?msg).with.json;
path.should.be.a.file(?msg).with.not.json;

assert.jsonFile(path, ?msg);
assert.notJsonFile(path, ?msg); 
````

### file().using.json.schema(s);

Assert if the path exists, is a file, contains json parsable text conforming to a JSON-Schema. 

* Chains after `file().with.json`
* Depends on [chai-json-schema](https://github.com/Bartvds/chai-json-schema)
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `json`.
* The `with` and `using` chains are just sugar.

````
expect(path).to.be.a.file(?msg).with.json.using.schema(s);
expect(path).to.be.a.file(?msg).with.json.not.using.schema(s);

path.should.be.a.file(?msg).with.json.using.schema(s);
path.should.be.a.file(?msg).with.json.not.using.schema(s);

assert.jsonSchemaFile(path, schema,?msg);
assert.notJsonSchemaFile(path, schema, ?msg); 
````

### content()

Assert if the path exists, is a file and has specific content.

* Reads file as utf8 text (planneds update to support base64, binary Buffer etc). 
	
:interrobang: - **add as chain behind file() and directory()** - :interrobang:
   
````
expect(path).to.have.content(data, ?msg);
expect(path).to.not.have.content(data, ?msg);

path.should.have.content(data, ?msg);
path.should.not.have.content(data, ?msg);

assert.fileContent(path, data, ?msg);
assert.notFileContent(path, data, ?msg);
````

## Future additions

Some ideas for new assertions. I'll add those in batches when I got a use case.

````
// content by path
expect(path).to.be.a.file(msg).and.equal(otherPath);
expect(path).to.be.a.file(msg).and.deep.equal(otherPath); // + mtime, uid, gid

// content types
expect(path).to.be.a.file(msg).with.xml;

// stat
expect(path).to.have.size(size);
expect(path).to.have.size(minSize, maxSize);

// user/group
expect(path).to.have.uid(id);
expect(path).to.have.gid(id);

expect(path).to.be.readable();
expect(path).to.be.writable();
expect(path).to.be.executable();

// with uid/gid feature?
expect(path).to.be.readableBy(uid_gid_string);
expect(path).to.be.writableBy(uid_gid_string);
expect(path).to.be.executableBy(uid_gid_string);

expect(path).to.be.have.linux.lineSeperator();
expect(path).to.be.have.mac.lineSeperator();
expect(path).to.be.have.windows.lineSeperator();

// paths
expect(path).to.be.parent.of(other);
expect(path).to.be.child.of(other);

expect(path).to.be.absolute();

// stat
expect(path).to.have.atime(date);
expect(path).to.have.mtime(date);
expect(path).to.have.ctime(date);

// some ideas for later (interface with chai-date-time?)
expect(path).to.have.atime.before(date);
expect(path).to.have.mtime.before(date);
expect(path).to.have.ctime.before(date);

expect(path).to.have.atime.after(date);
expect(path).to.have.mtime.after(date);
expect(path).to.have.ctime.after(date);
````

## History

* 0.0.1 - Git pre-alpha release

## Contributing

Contributions are welcome. Please follow the code, test and style patterns and keep JSHint happy.  

### Test generator

Look into the existing tests and notice the generator pattern used to generate tests for all aspects of the assertions while keeping the specs DRY. 

The pattern splits the test into a style declaration tree and a set of variation on 3 types of test scenarios. The generator then combines ('multiplies') every scenario variation with the style tree data to get good coverage of all cases.

The style tree defines ways to use the assertions: first level is the style: expect/should and assert. Then it defines both the normal use and the negation, and divides those into different invocations patterns for each style. So you can test with/without message, or as a chained method or property etc.

The tests are ways to specify assertion and the test expectations. 

* Valid means a test that will pass with that data (but fail the negation)
* Invalid means a test that will fail the assertion (but pass the negation). 
* Error means a test that will always fail (even when negated) because the data is invalid (bad data type, missing parameters etc). 

The report field is used the verify the error message if the test fails.

#### Why?

This looks a bit complex and cumbersome but it does allow to quickly add large amount of detailed tests for all assertions. It seems to work empowering so I might extract this to a separate npm module later.

It will generate a large amount of case variations so a small error in the code or your test data can explode in a many failing assertions. Look closely at which tests are failing tests to see what is causing what.

## Build & test

Install development dependencies in your git checkout:

    $ npm install

You need the global [grunt](http://gruntjs.com) command:

    $ npm install grunt-cli -g

Build and run tests:

    $ grunt

See the `Gruntfile` for additional commands.

### Vagrant

There is a Vagrantfile and set of Chef cookbooks to use with [Vagrant](http://www.vagrantup.com) for easy testing on a Linux VM. It will install a node.js from package, install the dependencies and enable grunt.

Using this is especially important for platform specific features, like working with file permissions. I'm still looking for a way to get this testable on Windows and MacOS. (Microsoft does provide free VM's but Apple is obnoxious so the VM boxes have to use a licenced Mac OS (or download a pirated one from bittorrent).

If you don't already have Vagrant see the [documentation](http://docs.vagrantup.com/v2/getting-started/index.html). Otherwise just run `vagrant up` from your console to boot it.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.