angular.module('dashboardApp')
//angularJS指令，接收数据，视图实现模块
//指令名，调用函数
    .directive('barsView', function () {
        return {
            restrict: 'E',//指明该指令只适用与html元素而不适用于其属性或css类名
            //指明数据和视觉元素具有双向绑定，一个改变另一个也会改变
            scope: { data: '=' },
            //要调用的函数将被创建
            link: renderView
        };
        
        function renderView($scope, $elements, $attrs) {
            var data = $scope.$parent.items;
//传入的$attrs就是自定义的指令名标签里的属性
            var width = $attrs.width,
                height = $attrs.height;

//找到顶级DOM元素
            var svg = d3.select($elements[0])
                .append('svg');

            svg.attr({
                         width: width,
                         height: height
                     });

            var max = d3.max(data, function(d) {
                return d.Value;
            });

            var colors = d3.scale.category20();

            var barHeight = 30;
            var leftMargin = 15;
            var barTextOffsetY = 22;

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr({
                          height: barHeight,
                          width: 0,
                          x: 0,
                          y: function(d, i) {
                              return i * barHeight;
                          },
                          stroke: 'white'
                      })
                .style('fill', function(d, i) {
                    return colors(i);
                })
                .transition()
                .duration(1000)
                .attr('width', function(d) {
                    return d.Value / (max / width);
                });
//更新条形图
            svg.selectAll('rect')
                .data(data)
                .transition()
                .duration(1000)
                .attr('width', function(d, i) {
                    return d.Value / (max / width);
                });

            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr({
                          fill: '#fff',
                          x: leftMargin,
                          y: function(d, i) {
                              return i * barHeight + barTextOffsetY;
                          }
                      })
                .text(function(d) {
                    return d.Name + ' (' + d.Value + ')';
                });
//更新文字
            svg.selectAll('text')
                .data(data)
                .attr({
                          fill: '#fff',
                          x: 15,
                          y: function(d, i) {
                              return i * barHeight + barTextOffsetY;
                          }
                      })
                .text(function(d) {
                    return d.Name + ' (' + d.Value + ')';
                });
        }
    });
