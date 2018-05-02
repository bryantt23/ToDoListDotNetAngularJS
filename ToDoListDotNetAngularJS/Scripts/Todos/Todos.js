/// <reference path="../angular.js" />

var todoApp = angular.module("todoApp", []);

todoApp.controller("todoCtrl", function ($scope, $http) {
    $scope.message = "hii";

    $scope.nums = [1, 2, 3, 4, 5];

    $scope.getTodos = function () {
        $http({
            method: "GET",
            url: "Home/GetEmployees"
        }).then(function mySuccess(response) {
            $scope.nums = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    }
});