/// <reference path="../angular.js" />

var todoApp = angular.module("todoApp", []);

todoApp.controller("todoCtrl", function ($scope, $http) {
    $scope.message = "hii";

    $scope.nums = [];
    
    $scope.delete = function (index) {
        alert(index);
    }
    
    $scope.addTodo = function (todo) {
        $http({
            method: "Post",
            url: "Home/AddTodo",
            data: { todo: todo }
        });
        $scope.getTodos();
    }

    $scope.getTodos = function () {
        $http({
            method: "GET",
            url: "Home/GetTodos"
        }).then(function mySuccess(response) {
            $scope.nums = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.getTodos();

});