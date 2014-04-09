var assert = require("assert");

module.exports = function (errorEventSpy,instance,expectedResult,property) {
	describe("when listening for error events on property set",function(){
		before(function(){
			errorEventSpy.reset();
			instance[property] = "newValue";
		});

		it("Should not call event",function(){
			assert(!errorEventSpy.called)
		});
	});
};