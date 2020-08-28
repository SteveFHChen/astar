/**
 * A*算法实现类
 * @constructor
 * 2020-08-01
 */
function AStar() {
    //地图存放二维数组
    this.map = [];
    //行数
    this.rowCount = 0;
    //列数
    this.colCount = 0;
    //出发点
    this.startPoint = new Point();
    //终点
    this.endPoint = new Point();
    //存放Opint类的open数组
    this.openList = [];
    //存在Opint类的close数组
    this.closeList = [];
    //新加:路径数组
    this.roadList = [];
};
AStar.prototype = {
    //是否为障碍物
    IsBar: function(x, y) {
        if (this.map[x][y] == 3) {
            //console.log("bar...");
            return true;
        } else {
            //console.log("no bar...")
            return false;
        }
    },
    //当前坐标是否在OpenList
    IsInOpenList: function(x, y) {
        for (var i = 0; i < this.openList.length; i++) {
            if (this.openList[i].x == x && this.openList[i].y == y) {
                return true;
            }

        }
        return false;
    },
    //当前坐标是否在CloseList
    IsInCloseList: function(x, y) {
        for (var i = 0; i < this.closeList.length; i++) {
            if (this.closeList[i].x == x && this.closeList[i].y == y) {
                return true;
            }

        }
        return false;
    },
    //计算G值;(p是Point类)  可以修改G值和H值的计算方式
    GetG: function(p) {
        if (p.father == null) {
            return 0;
        }
        return p.father.G + 1;
    },
    //计算H值
    GetH: function(p, pb) {
        return Math.abs(p.x - pb.x) + Math.abs(p.y - pb.y);
    },
    //添加当前点的上下左右相邻的方格到Open列表中
    AddNeiToOpenList: function(curPoint) {
        for (var x = curPoint.x - 1; x <= curPoint.x + 1; x++) {
            for (var y = curPoint.y - 1; y <= curPoint.y + 1; y++) {
                //排除自身以及超出下标的点
                if ((x >= 0 && x < this.colCount && y >= 0 && y < this.rowCount) && !(curPoint.x == x && curPoint.y == y)) {
                    //排除斜对角
                    if (Math.abs(x - curPoint.x) + Math.abs(y - curPoint.y) == 1) {
                        //不是障碍物且不在关闭列表中
                        if (this.IsBar(x, y) == false && this.IsInCloseList(x, y) == false) {
                            //不存在Open列表
                            if (this.IsInOpenList(x, y) == false) {
                                var point = new Point();
                                point.x = x;
                                point.y = y;
                                point.father = curPoint;
                                point.G = this.GetG(point);
                                point.H = this.GetH(point, this.endPoint);
                                this.openList.push(point);
                            }
                        }
                    }
                }
            }
        }
    },
    //在openlist集合中获取G+H为最小的Point点
    GetMinFFromOpenList: function() {
        var minPoint = null;
        var index = 0;
        for (var i = 0; i < this.openList.length; i++) {
            if (minPoint == null || minPoint.G + minPoint.H >= this.openList[i].G + this.openList[i].H) {
                minPoint = this.openList[i];
                index = i;
            }
        }
        return {
            minPoint: minPoint,
            index: index
        }
    },

    GetPointFromOpenList: function(x, y) {
        for (var i = 0; i < this.openList.length; i++) {
            if (this.openList[i].x == x && this.openList[i].y == y) {
                return this.openList[i];
            }
        }
        return null;

    },
    //开始寻找节点
    FindPoint: function() {
        console.log(this);
        this.openList=[];
        this.closeList=[];
        this.roadList=[];
        this.openList.push(this.startPoint);
        while (this.IsInOpenList(this.endPoint.x, this.endPoint.y) == false || this.openList.length == 0) {
            var curPoint = this.GetMinFFromOpenList().minPoint;
            var index = this.GetMinFFromOpenList().index;
            if (curPoint == null) {
                console.log("没有路");
                alert("没有通路")
                return false;
            }
            this.openList.splice(index, 1);
            this.closeList.push(curPoint);
            this.AddNeiToOpenList(curPoint);
        }
        var p = this.GetPointFromOpenList(this.endPoint.x, this.endPoint.y);
        console.log(p + ".....");

        //this.endPoint.father = p;				//新添加:设置终点的father
        this.roadList.unshift(this.endPoint);	//新添加:添加终点到路径数组

        while (p.father != null) {				//从终点前的节点往前回溯,得到路径
            p = p.father;
            this.map[p.x][p.y] = 4;
            this.roadList.unshift(p);			//新添加:添加节点到路径数组
        }
        //把终结点也设置成4
        this.map[this.endPoint.x][this.endPoint.y] = 4;

        console.log("完成寻路 路径数组："+this.roadList);	//新添加内容
        this.closeList.push(this.endPoint);		//新添加内容
        return true;
    },
    PrintMap: function() {

    }
};