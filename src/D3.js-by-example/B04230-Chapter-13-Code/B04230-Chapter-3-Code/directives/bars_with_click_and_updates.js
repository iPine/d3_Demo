angular.module('dashboardApp')
    .directive('barsView', function ($timeout) {
        return {
            restrict: 'E',
            scope: { data: '=' },
            link: renderView
        };

        function renderView($scope, $element, $attrs) {
            var parent = $scope.$parent;
            var data = $scope.$parent.items;
//以后每检测到selectedItem改变一次，就调用一次render
            parent.$watch("selectedItem", render, true);

            var width = $attrs.width;
            var height = $attrs.height;

            var svg = d3.select($element[0]).append("svg");
            svg.attr({ width: width, height: height });
//指令首次加载完后就执行一次
            render();

            function render() {
                var colors = d3.scale.category20();

                var max = d3.max(data, function (d) {
                    return d.Value
                });

                svg.selectAll("rect")
                    .data(data)
                    .enter().append("rect")
                    .on("click", function(d, i) {
                        // parent.selectedItem = d;
                        //必须要在$timeout函数里更改selectedItem属性的值
                        //才能让点击事件和文本detail指令一致
                        $timeout(function() {
                            parent.selectedItem = d;
                        });
                    })
                    .attr({
                              height: 30,
                              width: 0,
                              x: 0,
                              y: function(d, i) {
                                  return i * 35;
                              }
                          })
                    .style("fill", function(d, i) {
                        return colors(i);
                    })
                    .transition().duration(1000)
                    .attr("width", function(d) {
                        return d.Value / (max / width);
                    });

                svg.selectAll("text")
                    .data(data).enter().append("text")
                    .attr({ fill: "#fff", x: 15, y: function(d, i) {
                        return i * 35 + 22;
                    } })
                    .text(function(d) {
                        return d.Name + " (" + d.Value + ")";
                    });
//矩形和文本的更新模式
                svg.selectAll("rect")
                    .data(data)
                    .transition().duration(1000)
                    .attr("width", function(d, i) {
                        return d.Value / (max / width);
                    });

                svg.selectAll("text")
                    .data(data)
                    .attr({ fill: "#fff", x: 15, y: function(d, i) {
                        return i * 35 + 22;
                    } })
                    .text(function(d) {
                        return d.Name + " (" + d.Value + ")";
                    });
            }
        }
    });