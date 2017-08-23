function appendMultiText(container, str, posX, posY, width, fontsize, fontfamily){
//放在什么容器内，什么字符串，文本起始x位置，y位置，文本宽度，字体大小，字体类型

//参数个数不足6，7时就取默认值			
			if( arguments.length < 6){
				fontsize = 14;
			}		
			
			if( arguments.length < 7){
				fontfamily = "simsun, arial";
			}
			
			//按要求分割字符串，调用splitByLine()函数
			var strs = splitByLine(str,width,fontsize);
			
			var mulText = container.append("text")
				.attr("x",posX)
				.attr("y",posY)
				.style("font-size",fontsize)
				.style("font-family",fontfamily);
				
			mulText.selectAll("tspan")
				.data(strs)
				.enter()
				.append("tspan")
				.attr("x",mulText.attr("x"))
				.attr("dy","1em")
				.text(function(d){
					return d;
				});
				
			return mulText;
			
			function splitByLine(str,max,fontsize){
				var curLen = 0;
				var result = [];
				var start = 0, end = 0;
				for(var i=0;i<str.length;i++){
					var code = str.charCodeAt(i);
					var pixelLen = code > 255 ? fontsize : fontsize/2;
					curLen += pixelLen;
					if(curLen > max){
						end = i;
						result.push(str.substring(start,end));
						start = i;
						curLen = pixelLen;
					}
					if( i === str.length - 1 ){
						end = i;
						result.push(str.substring(start,end+1));
					}
				}
				return result;
			}
}