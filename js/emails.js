"use strict";

// -----------------------
// directives
// -----------------------

appModule.directive("emailsBlock", function () {
	return {
		restrict: "E",
		templateUrl: "templates/emails/emails-block.html",
		scope: {},
		controllerAs: "ctrl",
		controller: function () {
			this.activeFolder = "incoming";
      this.activeEmail = undefined;
		},
	};
});

appModule.directive("folderList", function() {
  return {
    restrict: "E",
    templateUrl: "templates/emails/folder-list.html",
    scope: { activeFolder: "=" },
		bindToController: true,
    controllerAs: "ctrl",
    controller: function ($http, emailStorage) {
      this.folders = [{ name: "fetching data...", count: 0 }];
	    var self = this;

      emailStorage.getFoldersPromise().then(
        function(result) {
          self.folders = result;
        },
        function(error) {
          self.folders = [{ name: "Error occurred while fetching data.", count: 0 }];
          console.log(error);
        }
      );
    },
  };
});

appModule.directive("emailList", function() {
  return {
    restrict: "E",
    templateUrl: "templates/emails/email-list.html",
    scope: {
      activeFolder: "@",
      activeEmail: "=",
    },
    bindToController: true,
    controllerAs: "ctrl",
    controller: function(emailStorage) {
      this.emailsByFolder = { "incoming": [{"subject": "fetching data..." }] };
      var self = this;

      emailStorage.getEmailsByFolderPromise().then(
        function(result) {
          self.emailsByFolder = result;
        },
        function(error) {
          self.folders = { "incoming": [{"subject": "Error occurred while fetching data." }] };
          console.log(error);
        }
      );
    },
  };
});

appModule.directive("emailDetails", function() {
  return {
    restrict: "E",
    templateUrl: "templates/emails/email-details.html",
    scope: { activeEmail: "=" },
    bindToController: true,
    controllerAs: "ctrl",
    controller: function() {
      if (!this.activeEmail) {
        this.activeEmail = { text: "Choose item in email list..." };
      }
    },
  };
});

// -----------------------
// services
// -----------------------

appModule.factory("emailStorage", function($http) {
  var emailsByFolderPromise = $http.get("https://jsonblob.com/api/jsonBlob/56ad0df8e4b01190df4c3fb3");

  return {
    getEmailsByFolderPromise: function() {
      var resultPromise = emailsByFolderPromise.then(function (result) {
        return result.data;
      });

      return resultPromise;
    },
    getFoldersPromise: function() {
      var foldersPromise = emailsByFolderPromise.then(function (result) {
        var emailsByFolder = result.data;
        var folderNames = Object.keys(emailsByFolder);
        var folders = [];

        folderNames.forEach(function(key) {
          folders.push({name: key, count: emailsByFolder[key].length});
        });

        return folders;
      });

      return foldersPromise;
    },
  };
});