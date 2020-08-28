
/**
 * 节点类：代表地图和A*中的一个节点
 * @constructor
 */
function Point() {
    this.x = 0;
    this.y = 0;
    this.G = 0; //G值 开始点 到当前点的移动量
    this.H = 0; //H值　当前点移动目的地的移动量估算值
    this.father = null;
};
Point.prototype = {
    Console: function() {
        console.log("x:" + this.x + " and y:" + this.y);
    },
    Init: function(x, y, father) {
        this.x = x;
        this.y = y;
        this.father = father;
    }
};