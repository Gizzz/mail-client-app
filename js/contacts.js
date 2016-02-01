"use strict";

// -----------------------
// directives
// -----------------------

angular.module("email-client-app").directive("contactsBlock", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/contacts-block.html",

	};
});

angular.module("email-client-app").directive("userList", function () {
	return {
		restrict: "E",
		templateUrl: "templates/contacts/user-list.html",
		controllerAs: "userListCtrl",
		controller: function (userStorage) {
			this.users = userStorage.users;
		},
	};
});

// -----------------------
// services
// -----------------------

angular.module("email-client-app").factory("userStorage", function () {
	var users = [
		{
			userId: 1,
			fullName: "John Smith",
			birthdate: "1987-08-17",
			gender: "male",
			address: "4168 Grant Avenue Londonderry, NH 03053",
			email: "evulefeff-3371@yopmail.com",
		}, {
			userId: 2,
			fullName: "Miranda March",
			birthdate: "1995-10-14",
			gender: "female",
			address: "5984 Holly Court New Orleans, LA 70115",
			email: "kehatenisse-1189@yopmail.com",
		}, {
			userId: 3,
			fullName: "Gabe Aul",
			birthdate: "1991-07-22",
			gender: "male",
			address: "4168 Grant Avenue Redmond, NH 03053",
			email: "soddyrridu-1929@yopmail.com",
		},
	];

	return { users };
});