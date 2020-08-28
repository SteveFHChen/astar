
/**
 * 地图类
 * map数组保存数字标识 :0 默认(灰色格子)　1 开始点　2 结束点　3 障碍物  4通道
 * @param id:地图容器DOM的id值
 * @constructor
 */
function StarMap(id) {
    this.map = [];
    this.container = document.getElementById(id);
    this.colCount = 0;
    this.rowCount = 0;
}
StarMap.prototype = {
    init: function(colCount, rowCount, map0) {
        this.map.splice(0, this.map.length);
        //this.map = [];
        this.container.innerHTML = "";
        console.log("地图数组："+map0)
        if(map0!=null && map0.length>0){
            console.log("加载地图");
            this.map = map0.slice(0);
            this.colCount = map0.length;
            this.rowCount = map0[0].length;
            return;
        }
        console.log("自定义地图");
        this.colCount = colCount;
        this.rowCount = rowCount;
        for (var colIndex = 0; colIndex < this.colCount; colIndex++) {
            this.map.push([]);
            for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
                this.map[colIndex].push(0);
            }
        }
    },
    //初始化地图,全部设置为灰色格子
    drawMap: function(callback) {
        for (var colIndex = 0; colIndex < this.map.length; colIndex++) {
            for (var rowIndex = 0; rowIndex < this.map[colIndex].length; rowIndex++) {
                var div = document.createElement("div");
                div.style.top = colIndex * tileSize + 5 + "px";
                div.style.left = rowIndex * tileSize + 5 + "px";
                div.setAttribute("colIndex", colIndex);
                div.setAttribute("rowIndex", rowIndex);
                div.onclick = callback;
                this.container.appendChild(div);
            }

        }

    },
    //寻路完成,用红色格画出路径
    drawPoints: function() {
        var divs = this.container.children;
        console.log(divs.length);
        //console.log(this.map);
        var timer = 1000;
        for (var i = 0; i < divs.length; i++) {
            var colIndex = divs[i].getAttribute("colIndex");
            var rowIndex = divs[i].getAttribute("rowIndex");
            if (this.map[colIndex][rowIndex] == 4) {
                divs[i].style.backgroundColor = "red";
            }
        }
    },

    //画出障碍
    drawBars: function(){
        var divs = this.container.children;
        for (var i = 0; i < divs.length; i++) {
            var colIndex = divs[i].getAttribute("colIndex");
            var rowIndex = divs[i].getAttribute("rowIndex");
            if (this.map[colIndex][rowIndex] == 3) {
                divs[i].style.backgroundColor = "black";
                console.log("障碍物坐标："+colIndex+","+rowIndex);
            }
        }
    },

    getPoint: function(colIndex, rowIndex) {
        return this.map[colIndex][rowIndex];
    },
    setStartPoint: function(colIndex, rowIndex) {
        this.map[colIndex][rowIndex] = 1;
    },
    setEndPoint: function(colIndex, rowIndex) {
        this.map[colIndex][rowIndex] = 2;
    },
    setBarPoint: function(colIndex, rowIndex) {
        this.map[colIndex][rowIndex] = 3;
    },
    clearMap: function() {
        this.map.splice(0, this.map.length);
        this.container.innerHTML = "";
    }
}