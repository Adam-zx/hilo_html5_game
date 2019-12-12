//获取画布元素
var canvas = document.getElementById("111");
var ctx = canvas.getContext("2d");

//定义游戏场景
var bgReady = false;
var bgImage = new Image();
bgImage.src = "img/backg.jpg";
bgImage.onload = function(){
	bgReady = true;
}

//定义mario对象样式
var marioReady = false;
var marioImage = new Image();
marioImage.src = "img/1.png";
marioImage.onload = function(){
	marioReady = true;
}

//定义怪物样式
var monsterReady = false;
var monsterImage = new Image();
monsterImage.src = "img/2.png";
monsterImage.onload = function(){
	monsterReady = true;
}

//定义mario初始参数
var mario = {
	speed: 256,
	x: canvas.width/2,
	y: canvas.height/2
}

//定义怪物初始参数
function monster() {
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;
	this.speed = 100;
	this.xDirection = 1;
	this.yDirection = 1;
	this.move = function (modifier) {
		this.x += this.xDirection * this.speed * modifier;
		this.y += this.yDirection * this.speed * modifier;
		if (this.x >= canvas.width - 32)
		{
			this.x = canvas.width - 32;
			this.xDirection = -1;
		}else if (this.x <= 0)
		{
			this.x = 0;
			this.xDirection = 1;
		}else if (this.y >= canvas.height - 32)
		{
			this.y = canvas.height - 32;
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
addEventListener(
	"keydown", 
	function (e) {
		keysDown[e.keyCode] = true;
	}, 
	false
);
addEventListener(
	"keyup", 
	function (e) {
		delete keysDown[e.keyCode];
	}
);

//定义移动事件
var Move = function (modifier) {

	if (38 in keysDown) {
		mario.y -= mario.speed * modifier;
	}
	if (40 in keysDown) {
		mario.y += mario.speed * modifier;
	}
	if (37 in keysDown) {
		mario.x -= mario.speed * modifier;
	}
	if (39 in keysDown) {
		mario.x += mario.speed * modifier;
	}
	
	if (mario.x >= canvas.width - 32) {
		mario.x = 0;
	}else if (mario.x <= 0) {
		mario.x = canvas.width - 32;
	}
	if (mario.y >= canvas.height - 32) {
		mario.y = 0;
	}else if (mario.y <= 0) {
		mario.y = canvas.height - 32;
	}

	for (var i = 0; i <= monsterSum; i++) {
		monsterList[i].move(modifier);	
	}
}

//定义绘图事件
var Draw = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0 ,0);
		if (marioReady) {
			ctx.drawImage(marioImage, mario.x, mario.y);
		}
		
		if (monsterReady) {
			for (var i = 0; i <= monsterSum; i++)
			ctx.drawImage(monsterImage, monsterList[i].x, monsterList[i].y);
		}
	}	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font =  "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	last = Date.now() - start;
	ctx.fillText(last/1000, 12, canvas.height-590);
}

//
var Check = function () {
	
	if (monsterSum != Math.floor(last / 5000)){
		monsterSum ++;
		monsterList[monsterSum] = new monster();
	}

	for (var i = 0; i <= monsterSum; i++) {
		if (
			(monsterList[i].x - 32) <= mario.x
			&& mario.x <= (monsterList[i].x + 32)
			&& (monsterList[i].y - 32) <= mario.y
			&& mario.y <= (monsterList[i].y + 32)
		) {
			end = Date.now();
			alert("你被怪物捉到了，游戏结束");
			End();
		}
	}
}

var End = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0 ,0);
	}
	window.clearInterval(timer);
	return;
}

var main = function () {
	var now = Date.now();
	var delta = now - then;
	Move(delta / 1000);
	Draw();
	Check();
	
	then = now;
}

var then = Date.now();
var start = then;
timer = setInterval(main, 1); 