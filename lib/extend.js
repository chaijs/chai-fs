module.exports = function (chai, utils) {
	/* jshint -W030 */
	var Assertion = chai.Assertion;
	var flag = utils.flag;

	var fs = require('fs');
	var path = require('path');

	//-------------------------------------------------------------------------------------------------------------

	Assertion.overwriteProperty('empty', function (_super) {
		return function () {
			var obj = this._obj;

			if (!Assertion.handleOverwritePropertyFlag.call(this, 'empty', obj)) {
				// unhandled
				_super.call(this);
			}
		};
	});
};