var canvas = document.getElementById("Circle");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var lines = [];

clearCanvas();
generateLine();
setInterval(drawLine, 30);

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	context.fillStyle = "#fff";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function generateLine() {
	for (var i = 0; i < 360; i++) {
		lines.push(new Line(i+1));
	};
}

function drawLine() {
	clearCanvas();
	for (var i = 0; i < lines.length; i++) {
		lines[i].update().draw();
	};
}

function Line(ang) {
	this.x1 = canvas.width/2;
	this.y1 = canvas.height/2;
	this.x2 = canvas.width/2;
	this.y2 = canvas.height/2;
	this.life = 200;
	this.angle = ang;

	this.update = function() {
		var dx = Math.cos(this.angle * Math.PI / 180);
		var dy = Math.sin(this.angle * Math.PI / 180);
		this.life--;
		if (this.life > 0) {
			this.x2+=dx;
			this.y2-=dy;
		};

		if (this.life <= 0) {
			var x = randomBetween(0,4);
			if (x == 0) {
				this.x2-=5;
			};
			if (x == 1) {
				this.x2+=5;
			};
			if (x == 2) {
				this.y2-=5;
			};
			if (x == 3) {
				this.y2+=5;
			};
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.strokeStyle = "#000";
		context.stroke();

		for (var i = 0; i < lines.length; i++) {
			if (lines[i] == this) {
				if (lines[i+1] != null) {
					context.beginPath();
					context.moveTo(this.x2, this.y2);
					context.lineTo(lines[i+1].x2, lines[i+1].y2);
					context.strokeStyle = "#000";
					context.stroke();
				};
				i = lines.length;
			};
		};

		return this;
	}

}

