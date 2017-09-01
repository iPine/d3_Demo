angular.module('dashboardApp')
    .directive('barsView', function ($timeout) {
      //$timeout作为参数传入，通过这个函数AngularJS才能检查变化
        return {
            restrict: 'E',
            scope: { data: '=' },
            link: renderView
        };

        function renderView($scope, $elements, $attrs) {
            var data = $scope.$parent.items;

            var width = $attrs.width,
                height = $attrs.height;

            var svg = d3.select($elements[0])
                .append('svg');
            svg.attr({
                         width: width,
                         height: height
                     });

            var max = d3.max(data, function (d) {
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
                .on('click', function (d, i) {
                    $timeout(function () {
                //更改了scope上的selectedItem属性的值
//这被包裹在对AngularJS $ timeout函数的调用中，这将使浏览器根据此属性的更改更新UI
                        parent.selectedItem = d;
                        d.Name = "foo";
                    });
                })
                .attr({
                          height: barHeight,
                          width: 0,
                          x: 0,
                          y: function (d, i) {
                              return i * barHeight;
                          },
                          stroke: 'white'
                      })
                .style('fill', function (d, i) {
                    return colors(i);
                })
                .transition()
                .duration(1000)
                .attr('width', function (d) {
                    return d.Value / (max / width);
                });

            svg.selectAll('rect')
                .data(data)
                .transition()
                .duration(1000)
                .attr('width', function (d, i) {
                    return d.Value / (max / width);
                });

            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr({
                          fill: '#fff',
                          x: leftMargin,
                          y: function (d, i) {
                              return i * barHeight + barTextOffsetY;
                          }
                      })
                .text(function (d) {
                    return d.Name + ' (' + d.Value + ')';
                });

            svg.selectAll('text')
                .data(data)
                .attr({
                          fill: '#fff',
                          x: 15,
                          y: function (d, i) {
                              return i * barHeight + barTextOffsetY;
                          }
                      })
                .text(function (d) {
                    return d.Name + ' (' + d.Value + ')';
                });
        }
    });
