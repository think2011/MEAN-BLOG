var app = angular.module('app', ['ngRoute']);

app.directive('focus', function () {
    return  {
        restrict: 'A', // 限制只能通过 属性(attribute) 调用
        link: function (scope, element, attr) {
            element[0].focus();
        }
    }
});

app.config(function ($routeProvider, $locationProvider) {
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
        }).
        otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
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