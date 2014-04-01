// 声明模块
var app = angular.module('app', ['ngRoute']); // 在模块中注入ngRoute（路由）模块

// 声明一个指令
app.directive('focus', function () {
    return  {
        restrict: 'A', // 限制只能通过 属性(attribute) 调用
        link: function (scope, element, attr) {
            element[0].focus();
        }
    }
});

// 配置路由信息
app.config(function ($routeProvider) {
    $routeProvider.
        when('/', { 
            templateUrl: 'posts.html', // 当打开链接为 "/", 载入posts.html
            controller: postsCtrl // 对应的控制器为 postsCtrl, 以下雷同
        }).
        when('/post/add', {
            templateUrl: 'add.html',
            controller: postCtrl
        }).
        when('/post/:_id', {
            templateUrl: 'content.html',
            controller: contentCtrl
        }).
        otherwise({
            redirectTo: '/' // 其他情况，跳到链接"/"
        });
});

/* 每个路由对应的控制器 */
// 文章列表控制器
function postsCtrl ($scope, $http) {    // 注入$Http服务,类似于jquery的ajax
    $http.get('/posts').success(function (data) {
        $scope.posts = data; // 将获得的数据保存到NG的数据模型
    });
}

// 发布文章控制器
function postCtrl ($scope, $http, $location) {  // 注入$location服务
    $scope.form = {};   // 初始化一个NG数据模型

    // 提交操作函数
    $scope.form.submit = function () {
        $http.post('/post/add', $scope.form).success(function () {
            $location.url('/'); // 返回首页
        });
    };
}

// 文章内容控制器
function contentCtrl ($scope, $http, $routeParams) {
    // 根据点击的链接，发送对应的请求
    $http.get('/post/' + $routeParams._id).success(function (data) {
        $scope.post = data; // 将获取到的数据 通过$scope绑定成NG的数据模型
    });

    // 文章内评论处理
    $scope.form = {};
    $scope.form.submit = function () {
        $http.post('/post/' + $routeParams._id + '/comment', $scope.form).success(function () {
             // 因为NG会自动根据数据模型更新HTML页面，所以这里只需修改数据模型
            $scope.post.comments.push({
                comment: $scope.form.comment
            });

            $scope.form.comment = '';   // 清空输入框
        });
    };
}

// 启动模块
angular.bootstrap(document, ['app']);