"use strict";

var appModule = angular.module("email-client-app", ["ui.router"]);

appModule.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state("emails", {
			url: "/emails",
			template: "<emails-block></emails-block>",
		})
		.state("contacts", {
			url: "/contacts",
			template: "<contacts-block></contacts-block>",
		});
});