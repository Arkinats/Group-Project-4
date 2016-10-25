var app = angular.module("chatApp", []);

app.factory("chat", function($http) {
    var API_ROOT = "chat";
    return {
        get: function() {
            return $http
                .get(API_ROOT)
                .then(function (response) {
                    //console.log("factory: chat: get:");
                    return response.data;
                })
        },
        post: function(chatObj) {
            return $http
                .post(API_ROOT, chatObj)
                .then(function(data, status, headers, config) {
                    //console.log("Tried to post: ");
                    //console.log(chatObj);
                });
        }
    }
});

app.directive("gotoBottom", function() { // Not working as intended
    return {
        scope: {
            gotoBottom: "="
        },
        link: function (scope, element, attr) {
            scope.$watchCollection("gotoBottom", function(newValue) {
                if(newValue) {
                    $(element).scrollTop($(element)[0].scrollHeight);
                }
            });
        }
    }
});

app.controller("chatCtrl", function($scope, $http, $interval, chat, $anchorScroll, $location) {
    $scope.welcome = {username: "system", message: "Welcome to CS201r Creative Group Project 4 by Jeremiah & Joshua"};
    $scope.username = "";
    $scope.hasUsername = false;
    $scope.message = "";
    $scope.chatLog = [];
    //$scope.chatLog.push($scope.welcome);
    $scope.gotoBottom = function() {  // Only works once or twice and stops
        $location.hash("bottom");
    };
    $scope.setUsername = function() {
        if ($scope.username) {
          console.log("Setting username as: " + $scope.username);
          $scope.hasUsername = true;
        }
        else {
            console.log("Failed to set username: " + username);
        }
    };
    $scope.post = function() {
        console.log("Post has been called from: " + $scope.username + " message: " + $scope.message);
        var chatObj = {username: $scope.username, message: $scope.message};
        //console.log(chatObj);
        chat.post(chatObj);
        $scope.message = "";
    };
    $interval(function() {
        chat.get().then(function (data) {
            $scope.chatLog = data;
            //$scope.gotoBottom();
            $("#ct-content").scrollTop($("#ct-content")[0].scrollHeight);
        });
    }, 500);
});