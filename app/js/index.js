var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'list.html',
            controller: listCtrl
        }).
        when('/reg', {
            templateUrl: 'login.html',
            controller: regCtrl
        }).
        when('/login', {
            templateUrl: 'login.html',
            controller: loginCtrl
        }).
        when('/post', {
            templateUrl: 'post.html',
            controller: postCtrl
        }).
        when('/article', {
            templateUrl: 'article.html',
            controller: articleCtrl
        });
});

function listCtrl ($scope) {
}

function regCtrl ($scope) {
    $scope.action = {
        title: '注册',
        submit: function () {
            alert('注册')
        }
    }
}

function loginCtrl ($scope) {
    $scope.action = {
        title: '登录',
        submit: function () {
            alert('登录')
        }
    }
}

function postCtrl ($scope) {
}

function articleCtrl ($scope) {
}


angular.bootstrap(document, ['app']);