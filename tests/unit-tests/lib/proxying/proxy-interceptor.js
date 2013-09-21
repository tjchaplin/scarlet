var g = require("../../../../include");

describe("Given /lib/proxying/ProxyInterceptor", function() {

	var ProxyInterceptor = require("../../../../lib/proxying/proxy-interceptor");

	describe("When #ctor() with named function", function() {

		function AnyClass(){
			var self = this;
			self.methodCalled = false;
			self.anyProperty = "anyValue";
			self.anyMethod = function(anyParameter){
				self.methodCalled = true;
				return anyParameter;
			};
		}

		var observedArguments = null;
		var observedProxyInfo = null;
		var whenCalledExecuted = false;
		var interceptor = new ProxyInterceptor(AnyClass);

		var whenCalled = function(proxyInfo, proceed) {
			observedArguments = arguments;
			observedProxyInfo = proxyInfo;
			whenCalledExecuted = true;
			return proceed();
		};

		var replaceType = function(observableType) {
			AnyClass = observableType;
		};

		interceptor
			.intercept(
				self.whenCalled,
				self.replaceType);

		it("Then should be able to observe methods", function() {
			var instance = new AnyClass();
			instance.anyMethod("anyParameterValue");
			g.assert(whenCalledExecuted);
			g.assert(observedArguments);
			g.assert(observedProxyInfo);
		});

	});

});