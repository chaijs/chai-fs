module.exports = function (chai) {

	var Assertion = chai.Assertion;

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