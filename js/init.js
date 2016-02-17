"use strict";

var appModule = angular.module("email-client-app", ["ui.router"]);

appModule.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/login");

	$stateProvider
		// for debug only

		//.state("root", {
		//	url: "/",
		//})

		.state("login", {
			url: "/login",
			templateUrl: "templates/login.html",
			controllerAs: "ctrl",
			controller: function($state, loginService) {
				this.logIn = function (login, password) {
					loginService.login = login;
					loginService.password = password;
					$state.go("user-page.emails");
				};
			},
		})
		.state("logout", {
			url: "/logout",
			controller: function($state, loginService) {
				loginService.login = null;
				loginService.password = null;
				$state.go("login");
			}
		})
		.state("user-page", {
			url: "/user-page",
			templateUrl: "templates/user-page.html",
		})
			.state("user-page.emails", {
				url: "/emails",
				template: "<emails-block></emails-block>",
			})
			.state("user-page.contacts", {
				url: "/contacts",
				template: "<contacts-block></contacts-block>",
			})
				.state("user-page.contacts.details", {
					url: "/details/:userId",
					template: "<user-details></user-details>",
				})
				.state("user-page.contacts.edit", {
					url: "/edit/:userId",
					template: "<user-edit></user-edit>",
				});
});

appModule.run(function ($rootScope, $state, loginService) {

	// login check code

	//$rootScope.$on("$stateChangeStart", function(event, toState) {
	//	if (toState.name !== "login" && !loginService.isUserLoggedIn()) {
	//		event.preventDefault();
	//		alert("User not logged in");
	//		$state.go("login");
	//	} else if ((toState.name === "login" && loginService.isUserLoggedIn())) {
	//		event.preventDefault();
	//		$state.go("user-page.emails");
	//	}
	//});



	// ui-router debug snippet

	//$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
	//	console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
	//});
	//
	//$rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
	//	console.log('$stateChangeError - fired when an error occurs during transition.');
	//	console.log(arguments);
	//});
	//
	//$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
	//	console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
	//});
	//
	//$rootScope.$on('$viewContentLoaded',function(event){
	//	console.log('$viewContentLoaded - fired after dom rendered',event);
	//});
	//
	//$rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
	//	console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
	//	console.log(unfoundState, fromState, fromParams);
	//});

});

appModule.factory("loginService", function() {
	return {
		login: null,
		password: null,
		isUserLoggedIn: function() {
			return this.login === "user" && this.password === "123";
		},
	};
});

