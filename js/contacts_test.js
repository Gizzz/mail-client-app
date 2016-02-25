"use strict";

describe("userStorage service", function() {
	var userStorage;

	beforeEach(module("email-client-app"));
	beforeEach(inject(function($injector) {
		userStorage = $injector.get("userStorage");
	}));


	describe("getUsers function", function() {
		it("should return 3 users", function () {
			expect(userStorage.getUsers().length).toBe(3);
		});

		it("should return users populated with data", function () {
			var users = userStorage.getUsers();

			for (var i = 0; i < users.length; i++) {
				expect(users[i].id).toBeDefined();
				expect(users[i].id).toEqual(jasmine.any(Number));

				expect(users[i].fullName).toBeDefined();
				expect(users[i].fullName).toEqual(jasmine.any(String));

				expect(users[i].birthDate).toBeDefined();
				expect(users[i].birthDate).toEqual(jasmine.any(String));

				expect(users[i].gender).toBeDefined();
				expect(users[i].gender).toEqual(jasmine.any(String));

				expect(users[i].address).toBeDefined();
				expect(users[i].address).toEqual(jasmine.any(String));

				expect(users[i].email).toBeDefined();
				expect(users[i].email).toEqual(jasmine.any(String));
			}
		});
	});

	it("getUserById function should return user by id", function() {
		var user = userStorage.getUserById(1);
		expect(user.id).toBe(1);
	});

	it("updateUserData function should update user data", function() {
		var userToUpdate = {
			id: 1,
			fullName: "tst fullname",
			birthDate: "tst birthDate",
			gender: "tst gender",
			address: "tst address",
			email: "tst email",
		};

		userStorage.updateUserData(userToUpdate);
		var updatedUser = userStorage.getUserById(userToUpdate.id);

		expect(updatedUser.id).toBe(userToUpdate.id);
		expect(updatedUser.fullName).toBe(userToUpdate.fullName);
		expect(updatedUser.birthDate).toBe(userToUpdate.birthDate);
		expect(updatedUser.gender).toBe(userToUpdate.gender);
		expect(updatedUser.address).toBe(userToUpdate.address);
		expect(updatedUser.email).toBe(userToUpdate.email);
	})
});