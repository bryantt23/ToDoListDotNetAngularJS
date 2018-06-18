/// <reference path="../angular.js" />

var todoApp = angular.module("todoApp", []);

todoApp.controller("todoCtrl", function ($scope, $http) {
    $scope.editableTodo = "";
    $scope.todos = [];

    //http://jsfiddle.net/timriley/GVCP2/
    $scope.enableEditor = function (index) {
        $scope.todos[index].EditableTodo = $scope.todos[index].Todo;
        $scope.todos[index].EditorEnabled = true;
    }

    $scope.disableEditor = function (index) {
        $scope.todos[index].EditorEnabled = false;
    };

    $scope.updateTodo = function (todo, id, index) {
        $http({
            method: "Post",
            url: "Home/UpdateTodo",
            data: {
                index: id,
                todo: todo
            }
        }).then(function mySuccess(response) {
            $scope.todos[index].Todo = todo;
            $scope.todos[index].EditorEnabled = false;
        }, function myError(response) {
        });
    }

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
        $scope.todos = [];
        $http({
            method: "GET",
            url: "Home/GetTodos"
        }).then(function mySuccess(response) {
            console.log(response    );
            for (var i = 0; i < response.data.length; i++) {
                $scope.todos[i] = {
                    Todo: response.data[i].Todo,
                    Id: response.data[i].Id,
                    EditorEnabled: false,
                    EditableTodo: response.data[i].Todo
                }
                //console.log($scope.todos[i]);
            }
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };

    $scope.selectAllTodos = function () {        
        for (var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i]["checked"] = true;
        }
    };

    $scope.unselectAllTodos = function () {
        for (var i = 0; i < $scope.todos.length; i++) {
            $scope.todos[i]["checked"] = false;
        }
    };

    $scope.getTodos();

    $scope.sayHi = function () {
        alert('hi!')
    }
});