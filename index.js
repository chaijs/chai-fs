module.exports = function (chai, utils) {

	require('./lib/util')(chai, utils);
	require('./lib/extend')(chai, utils);

	require('./lib/assertions/content')(chai, utils);
	require('./lib/assertions/name')(chai, utils);
	require('./lib/assertions/path')(chai, utils);
	require('./lib/assertions/file')(chai, utils);
	require('./lib/assertions/directory')(chai, utils);

};
