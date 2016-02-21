"use strict";

describe("userStorage", function() {
	var userStorage;

	beforeEach(module("email-client-app"));
	beforeEach(function() {
		inject(function($injector) {
			userStorage = $injector.get("userStorage");
		})
	});

	it("should has 3 users", function () {
		expect(userStorage.getUsers().length).toBe(3);
	});
});