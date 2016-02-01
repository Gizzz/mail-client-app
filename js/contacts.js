"use strict";

// -----------------------
// directives
// -----------------------

angular.module("email-client-app").directive("contactsBlock", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/contacts-block.html",
		scope: {},
		controllerAs: "contactsBlockCtrl",
		controller: function () {
			this.selectedUserId = 1;
		}
	};
});

angular.module("email-client-app").directive("userList", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-list.html",
		scope: { selectedUserId: "=" },
		bindToController: true,
		controllerAs: "userListCtrl",
		controller: function (userStorage) {
			this.users = userStorage.users;
		},
	};
});

angular.module("email-client-app").directive("userDetails", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-details.html",
		scope: { selectedUserId: "@" },
		bindToController: true,
		controllerAs: "userDetailsCtrl",
		controller: function ($scope, userStorage) {
			this.getCurrentUser = function () {
				var userId = Number($scope.userDetailsCtrl.selectedUserId);
				return userStorage.getUserById(userId);
			};
		},
	};
});

// -----------------------
// services
// -----------------------

angular.module("email-client-app").factory("userStorage", function () {
	var users = [
		{
			id: 1,
			fullName: "John Smith",
			birthdate: "1987-08-17",
			gender: "male",
			address: "4168 Grant Avenue Londonderry, NH 03053",
			email: "evulefeff-3371@yopmail.com",
		}, {
			id: 2,
			fullName: "Miranda March",
			birthdate: "1995-10-14",
			gender: "female",
			address: "5984 Holly Court New Orleans, LA 70115",
			email: "kehatenisse-1189@yopmail.com",
		}, {
			id: 3,
			fullName: "Gabe Aul",
			birthdate: "1991-07-22",
			gender: "male",
			address: "4168 Grant Avenue Redmond, NH 03053",
			email: "soddyrridu-1929@yopmail.com",
		},
	];

	return {
		users,
		getUserById: function (id) {
			return users.filter( (item) => item.id === id )[0];
		},
	};
});