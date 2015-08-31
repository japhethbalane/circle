var canvas = document.getElementById("Circle");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var line = [];

clearCanvas();
generateLine();
setInterval(drawLine, 30);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	context.fillStyle = "#ffffff";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function generateLine() {
	for (var i = 0; i < 360; i++) {
		line.push(new Line(i+1));
	};
}

function drawLine() {
	clearCanvas();
	for (var i = 0; i < line.length; i++) {
		line[i].update().draw();
	};
}

function Line(ang) {
	this.x1 = canvas.width/2;
	this.y1 = canvas.height/2;
	this.x2 = canvas.width/2;
	this.y2 = canvas.height/2;
	this.life = 250;
	this.angle = ang;

	this.update = function() {
		var dx = Math.cos(this.angle * Math.PI / 180);
		var dy = Math.sin(this.angle * Math.PI / 180);
		this.life--;
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

