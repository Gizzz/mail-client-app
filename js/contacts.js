"use strict";

// -----------------------
// directives
// -----------------------

appModule.directive("contactsBlock", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/contacts-block.html",
		scope: {},
		controllerAs: "ctrl",
		controller: function () {
		}
	};
});

appModule.directive("userList", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-list.html",
		scope: { },
		bindToController: true,
		controllerAs: "ctrl",
		controller: function ($stateParams, userStorage) {
			this.getSelectedUserId = function () {
				return Number($stateParams.userId);
			};

			this.users = userStorage.getUsers();
		},
	};
});

appModule.directive("userDetails", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-details.html",
		scope: { },
		bindToController: true,
		controllerAs: "ctrl",
		controller: function ($scope, $stateParams, userStorage) {
			this.getCurrentUser = function () {
				var userId = Number($stateParams.userId);
				return userStorage.getUserById(userId);
			};
		},
	};
});

appModule.directive("userEdit", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-edit.html",
		scope: { },
		bindToController: true,
		controllerAs: "ctrl",
		controller: function ($scope, $stateParams, userStorage) {
			var userId = Number($stateParams.userId);
			this.user = userStorage.getUserById(userId);

			this.saveUser = function() {
				userStorage.updateUserData(this.user);
			};
		},
	};
});

// -----------------------
// services
// -----------------------

appModule.factory("userStorage", function () {
	if (!localStorage.users) {
		var usersData = [
			{
				id: 1,
				fullName: "John Smith",
				birthDate: "1987-08-17",
				gender: "male",
				address: "4168 Grant Avenue Londonderry, NH 03053",
				email: "evulefeff-3371@yopmail.com",
			}, {
				id: 2,
				fullName: "Miranda March",
				birthDate: "1995-10-14",
				gender: "female",
				address: "5984 Holly Court New Orleans, LA 70115",
				email: "kehatenisse-1189@yopmail.com",
			}, {
				id: 3,
				fullName: "Gabe Aul",
				birthDate: "1991-07-22",
				gender: "male",
				address: "4168 Grant Avenue Redmond, NH 03053",
				email: "soddyrridu-1929@yopmail.com",
			},
		];

		localStorage.users = JSON.stringify(usersData);
	}

	var users = JSON.parse(localStorage.users);

	return {
		getUsers: function () {
			return users;
		},
		getUserById: function (id) {
			var user = this.getUsers().filter(function (item) {
				return item.id === id;
			})[0];

			return user;
		},
		updateUserData: function(user) {
			var userToUpdate = this.getUserById(user.id);

			userToUpdate.fullName = user.fullName;
			userToUpdate.birthDate = user.birthDate;
			userToUpdate.gender = user.gender;
			userToUpdate.address = user.address;
			userToUpdate.email = user.email;
		},
	};
});