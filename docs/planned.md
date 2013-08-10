# Future additions

Some ideas for new assertions. I' might add these in batches when I got a use case.

:warning: *This is not final in any way!*

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

// tricky to test
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