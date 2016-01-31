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
          self.folders = [{ name: "Error occurred while fetching folders.", count: 0 }];
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
    controller: function(emailListStorage, globalState) {
      this.emailsByFolder = emailListStorage.emailsByFolder;
      
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
  var emailsByFolder = undefined;



  return {
    emailsByFolder: emailsByFolder,

    getFoldersPromise: function() {
      var promise = $http.get("https://jsonblob.com/api/jsonBlob/56ad0df8e4b01190df4c3fb3")
        .then(function (result) {
          var emailsByFolder = result.data;
          var folderNames = Object.keys(emailsByFolder);
          var folders = [];

          folderNames.forEach(function(key) {
            folders.push({name: key, count: emailsByFolder[key].length});
          });

          return folders;
        });

      return promise;
    },
  };
});

// to remove
angular.module("email-client-app").factory("emailListStorage", function($http) {
  var emailsByFolder = {
    incoming: [
      { 
        from: "John", 
        subject: "Hi, how was your vacation? ", 
        get text() { return this.subject.repeat(10); },
      }, { 
        from: "Sam", 
        subject: "Need more coffee ", 
        get text() { return this.subject.repeat(10); },
      }, { 
        from: "Gabe", 
        subject: "Win 10 updates", 
        get text() { return this.subject.repeat(10); },
      },
    ],
    sent: [
      { 
        from: "Carl", 
        subject: "Miranda - salary ", 
        get text() { return this.subject.repeat(10); },
      }, { 
        from: "Fred", 
        subject: "What about holidays? ", 
        get text() { return this.subject.repeat(10); },
      }, 
    ],
    trash: [
      { 
        from: "Спортмастер", 
        subject: "Зимняя распродажа! ", 
        get text() { return this.subject.repeat(10); },
      },
    ],
  };
  
  return {
    emailsByFolder: emailsByFolder,
    get folders() {
      var folderNames = Object.keys(this.emailsByFolder);
      
      var folders = []; 
      folderNames.forEach(function(key) {
        folders.push({name: key, count: emailsByFolder[key].length});
      });
      
      return folders;
    },
  };
});
  
angular.module("email-client-app").factory("globalState", function() {
  var globalState = {
    activeFolder: "incoming",
    activeEmail: undefined,
  };

  return globalState;
});