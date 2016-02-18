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
		controller: function () { },
	};
});

appModule.directive("folderList", function() {
  return {
    restrict: "E",
    templateUrl: "templates/emails/folder-list.html",
    scope: { },
		bindToController: true,
    controllerAs: "ctrl",
    controller: function ($http, $stateParams, emailStorage) {
      this.folders = [{ name: "fetching data...", count: 0 }];

      this.getActiveFolderName = function() {
        return $stateParams.folderName;
      };

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
    scope: { },
    bindToController: true,
    controllerAs: "ctrl",
    controller: function($state, $stateParams, emailStorage) {
      this.emailsByFolder = { "incoming": [{"subject": "fetching data..." }] };

      this.getActiveFolderName = function() {
        return $stateParams.folderName;
      };
      this.goToEmailDetailsState = function(emailId) {
        $state.go("user-page.emails.folder.email", { emailId: emailId });
      };
      this.isEmailActive = function(emailId) {
        return $stateParams.emailId === String(emailId);
      };

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
    scope: { },
    bindToController: true,
    controllerAs: "ctrl",
    controller: function($state, $stateParams, $scope, emailStorage) {
      var self = this;
      function initActiveEmail(stateName, stateParams) {
        if ( !stateName.includes("user-page.emails.folder.email") ) {
          self.activeEmail = { text: "Choose item in email list..." };
        } else {
          emailStorage.getEmailsByFolderPromise().then(
            function(result) {
              var activeFolder = result[stateParams.folderName];
              self.activeEmail = activeFolder.filter(function (email) {
                return email.id === Number(stateParams.emailId);
              })[0];
            },
            function(error) {
              self.activeEmail = { text: "Error occurred while fetching data." };
              console.log(error);
            }
          );
        }
      }

      initActiveEmail($state.current.name, $stateParams);
      $scope.$on("$stateChangeStart", function(event, toState, toParams) {
        initActiveEmail(toState.name, toParams);
      });
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