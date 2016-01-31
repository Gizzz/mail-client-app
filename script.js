"use strict";

angular.module("email-client-app", []);

// -----------------------
// directives
// -----------------------

angular.module("email-client-app").directive("folderList", function() {
  return {
    restrict: "E",
    templateUrl: "templates/folder-list.html",
    controllerAs: "folderListCtrl",
    controller: function($http, emailStorage, globalState) {
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

      this.getActiveFolder = function() {
        return globalState.activeFolder;
      };

      this.setActiveFolder = function(folderName) {
        globalState.activeFolder = folderName;
      };
    },
  };
});

angular.module("email-client-app").directive("emailList", function() {
  return {
    restrict: "E",
    templateUrl: "templates/email-list.html",
    controllerAs: "emailListCtrl",
    controller: function(emailStorage, globalState) {
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
      
      this.getActiveFolder = function() {
        return globalState.activeFolder;
      };
      
      this.setActiveEmail = function(email) {
        globalState.activeEmail = email;
      };
    },
  };
});

angular.module("email-client-app").directive("emailDetails", function() {
  return {
    restrict: "E",
    templateUrl: "templates/email-details.html",
    controllerAs: "emailDetailsCtrl",
    controller: function(globalState) {
      this.getActiveEmail = function() {
        return globalState.activeEmail;
      };
    },
  };
});

// -----------------------
// services
// -----------------------

angular.module("email-client-app").factory("emailStorage", function($http) {
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

angular.module("email-client-app").factory("globalState", function() {
  var globalState = {
    activeFolder: "incoming",
    activeEmail: { text: "Choose item in email list..." },
  };

  return globalState;
});