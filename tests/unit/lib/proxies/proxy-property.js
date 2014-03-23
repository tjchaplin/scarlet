var assert = require("assert");

function AnyClass() {
	var self = this;
	self.anyProperty = "anyValue";
	self.anyMethod = function() {};
}

describe("Given /lib/proxies/ProxyProperty", function() {

	var ProxyInfo = require("../../../../lib/proxies/proxy-info");
	var ProxyProperty = require("../../../../lib/proxies/proxy-property");

	var proceedWasCalled = false;
	var proceedThisContext = null;

	beforeEach(function() {
		proceedWasCalled = false;
		proceedThisContext = null;
	});

	describe("When #wrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyProperty");

		var proxy = new ProxyProperty(info, function(proceed,args, proxyInfo) {
			proceedThisContext = this;
			proceedWasCalled = true;
			return proceed();
		});

		proxy.wrap();

		it("Then should invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			assert(proceedWasCalled);
			assert(result == "anyValue");
		});

		it("Then should invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			assert(proceedWasCalled);
		});

		it("Then should have the correct 'this' context", function(){
			instance.anyProperty = "anyValue";
			assert(instance == proceedThisContext);
		});

		it("Then should have a '__scarlet' shadow object", function(){
			assert(instance.__scarlet__);
		});

	});

	describe("When #unwrap()", function() {

		var instance = new AnyClass();
		var info = new ProxyInfo(instance, "anyProperty");

		var proxy = new ProxyProperty(info, function(proceed,args,proxyInfo) {
			proceedWasCalled = true;
			return proceed();
		});

		proxy.wrap().unwrap();

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			var result = instance.anyProperty;
			assert(!proceedWasCalled);
		});

		it("Then should not invoke whenCalled delegate for 'get'", function() {
			instance.anyProperty = "anyValue";
			assert(!proceedWasCalled);
		});

	});

});