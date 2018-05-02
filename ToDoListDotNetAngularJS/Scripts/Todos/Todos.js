/// <reference path="../angular.js" />

var todoApp = angular.module("todoApp", []);

todoApp.controller("todoCtrl", function ($scope, $http) {
    $scope.todos = [];
    
    $scope.deleteTodo = function (index) {
        $http({
            method: "Post",
            url: "Home/DeleteTodo",
            data: { index: index }
        }).then(function mySuccess(response) {
            $scope.getTodos();
        }, function myError(response) {

        });
    }
    
    $scope.addTodo = function (todo) {
        $http({
            method: "Post",
            url: "Home/AddTodo",
            data: { todo: todo }
        }).then(function mySuccess(response) {
            $scope.getTodos();
        }, function myError(response) {

        });
    }

    $scope.getTodos = function () {
        $http({
            method: "GET",
            url: "Home/GetTodos"
        }).then(function mySuccess(response) {
            $scope.todos = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.getTodos();

});