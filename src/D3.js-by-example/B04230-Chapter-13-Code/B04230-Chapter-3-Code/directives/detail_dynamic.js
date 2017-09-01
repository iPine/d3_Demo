angular.module('dashboardApp')
    .directive('detailsView', function () {
        return {
            restrict: 'E',
            scope: { data: "=" },
        //告诉AngularJS在哪里找实现文件
            templateUrl: 'templates/dynamic_item.html'
        };
    });
