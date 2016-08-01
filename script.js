var canvas = document.getElementById("Circle");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var pores = [];
var poreCount = 1000;


////////////////////////////////////////////////////////////////////////////////

setInterval(world,30);
generatePores();

////////////////////////////////////////////////////////////////////////////////

function generatePores() {
	for (var i = 0; i < poreCount; i++) {
		pores.push(new Pore());
	}
}

function randomColor() {
	return "rgb("+randomBetween(50,255)+","+randomBetween(50,255)+","+randomBetween(50,255)+")";
}

function clearCanvas() {
	context.fillStyle = "#000";
	context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
	return Math.floor(Math.random()*(max-min))+min;
}

////////////////////////////////////////////////////////////////////////////////

function world() {
	clearCanvas();
	for (var i = 0; i < pores.length; i++) {
		pores[i].update().draw();
	}
}

////////////////////////////////////////////////////////////////////////////////

function Pore() {
	this.x = randomBetween(0,canvas.width);
	this.y = randomBetween(0,canvas.height);
	this.radius = randomBetween(1,5);
	this.speed = this.radius/5;
	this.minangle = 270 - randomBetween(20,90);
	this.maxangle = 270 + randomBetween(20,90);
	this.angle = randomBetween(this.minangle,this.maxangle);
	this.isRightSwing = true;
	if (randomBetween(0,2) == 0) {this.isRightSwing = false}
	var opacity = randomBetween(1,10);
	var maxOpacity = opacity;
	var color;
	var opacityBoolean = true;

	this.control = function(){
		if (this.y-this.radius > canvas.height) {this.y = 0-this.radius;}
		else if (this.y+this.radius < 0) {this.y = canvas.height+this.radius;}
		if (this.x-this.radius > canvas.width) {this.x = 0-this.radius;}
		else if (this.x+this.radius < 0) {this.y = canvas.width+this.radius;}
		color = "rgba(255,255,0,"+opacity+")";
	}

	this.updateOpacity = function() {
		if (opacityBoolean && opacity > 0.5) {opacity-=0.1;}
		else if (!opacityBoolean && opacityBoolean < maxOpacity) {opacity+=0.1;}
		if (opacity < 0.5 || opacity > maxOpacity) {opacityBoolean=!opacityBoolean;}
	}

	this.move = function() {
		if (this.isRightSwing) {
			this.angle--;
			if (this.angle <= this.minangle) {this.isRightSwing = false;}
		}
		else if (!this.isRightSwing) {
			this.angle++;
			if (this.angle >= this.maxangle) {this.isRightSwing = true;}
		}

		var dx = Math.cos(this.angle * (Math.PI / 180)) * this.speed;
        var dy = Math.sin(this.angle * (Math.PI / 180)) * this.speed;

        this.x += dx;
        this.y += dy;
	}

	this.update = function() {
		this.updateOpacity();
		this.control();
		this.move();

		return this;
	}

	this.draw = function() {
		context.fillStyle = color;
		context.strokeStyle = "black";
		context.shadowBlur = 10;
		context.shadowColor = color;

		context.beginPath();
		context.arc(this.x,this.y,this.radius,Math.PI*2,false);
		context.fill();
		context.stroke();

		// context.beginPath();
		// context.moveTo(this.x-this.radius - 1,this.y+this.radius + 1);
		// context.lineTo(this.x+this.radius + 1,this.y+this.radius + 1);
		// context.lineTo(this.x+this.radius + 2,this.y-this.radius*2 - 1);
		// context.lineTo(this.x,this.y-this.radius*3);
		// context.lineTo(this.x-this.radius - 2,this.y-this.radius*2 - 1);
		// context.lineTo(this.x-this.radius - 1,this.y+this.radius + 1);
		// context.stroke();
	}
}