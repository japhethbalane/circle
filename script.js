var canvas = document.getElementById("Circle");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var line = [];

clearCanvas();
generateLine();
setInterval(drawTree, 30);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	context.fillStyle = "#aaaaaa";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function generateLine() {
	line.push(new Line(0, 360));
}

function drawTree() {
	clearCanvas();
	for (var i = 0; i < line.length; i++) {
		line[i].update(canvas.width/2, canvas.height/2).draw();
		if (line[i].grow) {
			line.push(new Line(0, 360))
		};
	};
}

function Line(ang1, ang2) {
	this.x1 = canvas.width/2;
	this.y1 = canvas.height/2;
	this.x2 = canvas.width/2;
	this.y2 = canvas.height/2;
	this.life = 100;
	this.grow = false;
	this.angle = randomBetween(ang1, ang2);
	this.speed = 3;

	this.update = function(x, y) {
		var dx = Math.cos(this.angle * Math.PI / 180) * this.speed;
		var dy = Math.sin(this.angle * Math.PI / 180) * this.speed;
		this.x1 = x;
		this.y1 = y;
		this.life--;

		if (this.life <= 0) {
			this.grow = true;
		};
		if (this.life > 0) {
			this.x2+=dx;
			this.y2-=dy;
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = "#000000";
		context.stroke();

		return this;
	}

}

