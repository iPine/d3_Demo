angular.module('dashboardApp')
    .directive('donutView', function() {

    return {
        restrict: 'E',
        scope: { data: '=' },
        link: renderView
    };

    function renderView($scope, $elements, $attrs) {
        var width = $attrs.width,
            height = $attrs.height,
            radius = Math.min(width, height) / 2;
//增加$watch属性，检测selectedItem属性的变化，更新图
        var parent = $scope.$parent;
        parent.$watch('selectedItem', update, true);

        var colors = d3.scale.category20();

        var pie = d3.layout.pie()
            .value(function(d) { return d.Value; })
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 70)
            .outerRadius(radius - 10);

        var svg = d3.select($elements[0]).append('svg')
            .attr({
                width: width,
                height: height
            });
        var g = svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        var path = g
            .datum(parent.items)//放在selectAll前面的
            .selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('fill', function(d, i) {
                return colors(i);
            })
            .attr('d', arc)
//一直没明白这里的作用？在更新起作用
            .each(function(d) {
                this._current = d;
            });

        function update() {
            path = path.data(pie);
            path.transition()
                .duration(750)
//添加弧度插值器，更新d属性
                .attrTween("d",
                    function arcTween(a) {
                        //计算插值
                        var i = d3.interpolate(this._current, a);
                        this._current = i(0);
                        return function(t) {
                            return arc(i(t));
                        };
                    }
                );
        }
    }
});