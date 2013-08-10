# chai-fs

[![Build Status](https://secure.travis-ci.org/Bartvds/chai-fs.png?branch=master)](http://travis-ci.org/Bartvds/chai-fs) [![Dependency Status](https://gemnasium.com/Bartvds/chai-fs.png)](https://gemnasium.com/Bartvds/chai-fs) [![NPM version](https://badge.fury.io/js/chai-fs.png)](http://badge.fury.io/js/chai-fs)

[Chai](http://chaijs.com/) assertion plugins for the Node.js file system API. Uses `path` and synchronous `fs` to assert files and directories.

All assertions are available in `expect`, `should` and `assert` style, and support the optional, message parameter.

:warning: Note: this plugin is in a usable public alpha state: the assertions itself seem  solid enough but need a bit more real world use before publishing to the plugin library. API might still change before it reaches version 0.1.0.

## Usage

### server-side

Install from npm:

    $ npm install chai-fs

Have chai use the chai-fs module:

    var chai = require('chai');
    chai.use(require('chai-fs'));

### browser-side

No file system.

## Assertions

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
* The `with` chain is just syntax sugar.

````
expect(path).to.be.a.file(?msg).with.json;
expect(path).to.be.a.file(?msg).with.not.json;

path.should.be.a.file(?msg).with.json;
path.should.be.a.file(?msg).with.not.json;

assert.jsonFile(path, ?msg);
assert.notJsonFile(path, ?msg); 
````

### file().using.json.schema(obj);

Assert if the path exists, is a file, contains json parsable text and conforms to given JSON-Schema. 

* Chains after `file().with.json`
* The schema parameter must be a valid JSON-Schema v4. 
* Depends on the [chai-json-schema](https://github.com/Bartvds/chai-json-schema) plugin to be installed separately and activated with `chai.use()`.
* To negate this using `expect/should` you chain the `.not`-negation ***after*** the regular `json`.
* The `with` and `using` chains are just syntax sugar.

````
expect(path).to.be.a.file(?msg).with.json.using.schema(obj);
expect(path).to.be.a.file(?msg).with.json.not.using.schema(obj);

path.should.be.a.file(?msg).with.json.using.schema(obj);
path.should.be.a.file(?msg).with.json.not.using.schema(obj);

assert.jsonSchemaFile(path, schema,?msg);
assert.notJsonSchemaFile(path, schema, ?msg); 
````

### content()

Assert if the path exists, is a file and has specific content.

* Reads file as utf8 text (planneds update to support base64, binary Buffer etc). 
   
````
expect(path).to.have.content(data, ?msg);
expect(path).to.not.have.content(data, ?msg);

path.should.have.content(data, ?msg);
path.should.not.have.content(data, ?msg);

assert.fileContent(path, data, ?msg);
assert.notFileContent(path, data, ?msg);
````

:interrobang: - *In a future version this might be added this as a chain behind file() and directory()* 

###  Planned assertions

There are some ideas for future assertions stashed [in this document](https://github.com/Bartvds/chai-fs/tree/master/docs/planned.md).

## History

* 0.0.1 - Alpha release

## Contributing

Contributions are welcome. Please follow the code, test and style patterns and keep JSHint happy. Please make sure things work on all platforms, or at least Widows/Mac/Linux.

## Build & test

Install development dependencies in your git checkout:

    $ npm install

You need the global [grunt](http://gruntjs.com) command:

    $ npm install grunt-cli -g

Build and run tests:

    $ grunt

See the `Gruntfile` for additional commands.

### Test generator

This plugin uses a prototype of an "assertion plugin test-case generator".

Look into the existing tests and notice the generator pattern used to generate tests for all aspects of the assertions while keeping the specs DRY. 

The pattern splits the test into a style declaration tree and a set of variation on 3 types of test scenarios. The generator then combines ('multiplies') every scenario variation with the style tree data to get good coverage of all cases.

The style tree defines ways to use an assertion: first level is the style: expect/should and assert. Then it defines both the normal use and the negation, then divides those into different invocations patterns for each style. So you can test with/without message, or as a chained method or property etc.

The tests are ways to specify assertions and the test expectations. 

* Valid means a test that will pass with that data (but fail the negation)
* Invalid means a test that will fail the assertion (but pass the negation). 
* Error means a test that will always fail (even when negated) because the data is invalid (bad data type, missing parameters etc). 

The report field is used the verify the error message if the test fails.

#### Why?

This looks a bit complex and cumbersome but it does allow to quickly add large amount of detailed tests for all assertions. So far it seems to work empowering so I might extract this to a separate npm module later.

Note it will generate a large amount of case variations so a small error in the code or your test data can explode in a many failing assertions. Look closely at which tests are failing to see what is causing what.

## Vagrant

There is a Vagrantfile and set of Chef cookbooks to use with [Vagrant](http://www.vagrantup.com) for easy testing on a Linux VM. It will install a node.js from package, install the dependencies and enable grunt.

Using this is especially important for platform specific features, like working with file permissions. I'm still looking for a way to get this testable on Windows and MacOS. (Microsoft does provide free VM's but Apple is obnoxious so the VM boxes have to use a licenced Mac OS (or download a pirated one from bittorrent).

If you don't already have Vagrant see the [documentation](http://docs.vagrantup.com/v2/getting-started/index.html). Otherwise just run `vagrant up` from your console to boot it.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.