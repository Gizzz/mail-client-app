"use strict";

var appModule = angular.module("email-client-app", ["ui.router"]);

appModule.config(function ($stateProvider, $urlRouterProvider) {
	//$urlRouterProvider.otherwise("/emails");

	$stateProvider
		.state("emails", {
			url: "/emails",
			templateUrl: "templates/emails/emails-block.html",
		})
		.state("contacts", {
			url: "/contacts",
			template: "<contacts-block></contacts-block>",
		});
});