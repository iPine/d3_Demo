angular.module('dashboardApp')
//指明angularJS控制器：名称，数组(放入控制函数的变量，控制函数->为变量增添.items属性，从而声明要传递给指令的数据)
    .controller('dashboardController', ['$scope', function ($scope) {
        $scope.items = [
            { Name: 'Mike', Value: 49 },
            { Name: 'Marcia', Value: 52 },
            { Name: 'Mikael', Value: 18 }
        ];
    }]);