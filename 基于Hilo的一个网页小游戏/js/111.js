function init(){
    var stage = new Hilo.Stage({
    renderType:'canves',
    container: document.getElementById('111'),
    width: 600,
    height: 600
    });
    //启动计时器
    this.ticker = new Hilo.Ticker(60);
    this.ticker.addTick(stage);
    this.ticker.start();

    var me_speed=256;
    //定义背景
    var bg = new Hilo.Bitmap({
        image:'img/backg.jpg',
        rect:[0,0,600,600]

    }).addTo(stage);

    //定义“我自己”
    var me = new Hilo.Bitmap({
        image:'img/1.png',
        rect:[0,0,32,27],
        x:300,
        y:300
    }).addTo(stage);

    //定义怪物


    //定义怪物的初始参数
function monster(){
    var x = Math.random() * stage.width;
    var y = Math.random() * stage.height;
    var monster_1 = new Hilo.Bitmap({
        image:'img/2.png',
        rect:[0,0,31,32],
        x:x,
        y:y 
    });
    stage.addChild(monster_1);
    this.speed = 100;                       //移动速度
    this.xDirection = 1;
    this.yDirection = 1;

    this.move = function (modifier) {

        this.x += this.xDirection * this.speed * modifier;
        this.y += this.yDirection * this.speed * modifier;
        if (this.x >= stage.width - 32)
        {
            this.x = stage.width - 32;
            this.xDirection = -1;
        }else if (this.x <= 0)
        {
            this.x = 0;
            this.xDirection = 1;
        }else if (this.y >= stage.height - 32)
        {
            this.y = stage.height - 32;
            this.yDirection = -1;
        }else if (this.y <= 0)
        {
            this.y = 0;
            this.yDirection = 1;
        }
    };
}
    

var monsterSum = 0;
var monsterList = new Array();
monsterList[monsterSum] = new monster();
var keysDown = {};


//添加键盘操作监控事件
document.addEventListener(
    "keydown", 
    function (e) {
        keysDown[e.keyCode] = true;
    }, 
    false
);

document.addEventListener(
    "keyup", 
    function (e) {
        delete keysDown[e.keyCode];
    }
);

//定义移动事件
var Move = function (modifier) {

    if (38 in keysDown) {
        me.y -= me_speed * modifier;
    }
    if (40 in keysDown) {
        me.y += me_speed * modifier;
    }
    if (37 in keysDown) {
        me.x -= me_speed * modifier;
    }
    if (39 in keysDown) {
        me.x += me_speed * modifier;
    }
    
    if (me.x >= stage.width - 32) {
        me.x = 0;
    }else if (me.x <= 0) {
        me.x = stage.width - 32;
    }
    if (me.y >= stage.height - 32) {
        me.y = 0;
    }else if (me.y <= 0) {
        me.y = stage.height - 32;
    }
    for (var i = 0; i <= monsterSum; i++) {
        monsterList[i].move(2);  
    }
}





var Draw = function () {       
    

}

//碰撞检测
var Check = function () {
    
    if (monsterSum != Math.floor(last / 5000)){
        monsterSum ++;
        monsterList[monsterSum] = new monster();
    }

    for (var i = 0; i <= monsterSum; i++) {
        if (
            (monsterList[i].x - me.x) <= me.x
            && me.x <= (monsterList[i].x + 32)
            && (monsterList[i].y - 32) <= me.y
            && me.y <= (monsterList[i].y + 32)
        ) {
            end = Date.now();
            alert("你被怪物捉到了，游戏结束");
            End();
        }
    }
}

var End = function () {
    window.clearInterval(timer);
    return;
}


var main = function () {
    var now = Date.now();
    var delta = now - then;
    Move(delta / 1000);
    //刷新器

    last = Date.now() - start;
    Check();
    then = now;
}

var then = Date.now();
var start = then;
timer = setInterval(main, 1); //每隔三秒执行一次main函数

}