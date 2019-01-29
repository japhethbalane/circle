var canvas = document.getElementById('Circle');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var pores = [];
var poreCount = canvas.width * 0.3;

for (var i = 0; i < poreCount; i++) {
    pores.push(new Pore());
}

////////////////////////////////////////////////////////////////////////////////
var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, "#000428");
gradient.addColorStop(1, "#004e92");
function clearCanvas() {
    // context.fillStyle = 'rgba(50,50,50,1)';
    context.fillStyle = gradient;
    context.fillRect(0,0,canvas.width,canvas.height);
}

function randomBetween(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
}

function getHypothenuse(p1, p2) {
    var x = Math.abs(p1.x - p2.x);
    var y = Math.abs(p1.y - p2.y);
    return Math.sqrt((x * x) + (y * y));
}

function drawLines() {
    for (var pore1 of pores) {
        var arr = [];
        for (var pore2 of pores) {
            var hyp = getHypothenuse(pore1, pore2);
            if (pore1 != pore2 && hyp < 70) {
                context.strokeStyle = 'rgba(255,200,0,'+((70-hyp)/200)+')';
                context.beginPath();
                context.moveTo(pore1.x,pore1.y);
                context.lineTo(pore2.x,pore2.y);
                context.stroke();
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////

setInterval(world,30);
function world() {
    clearCanvas();
    drawLines();
    for (var i = 0; i < pores.length; i++) {
        pores[i].update().draw();
    }
}

////////////////////////////////////////////////////////////////////////////////

function Pore() {
    this.x = randomBetween(-100,canvas.width+100);
    this.y = randomBetween(-100,canvas.height+100);
    this.radius = randomBetween(10,50)*0.1;
    this.speed = this.radius/3;
    this.minangle = 270 - randomBetween(20,180);
    this.maxangle = 270 + randomBetween(20,180);
    this.angle = randomBetween(this.minangle,this.maxangle);
    this.isRightSwing = true;
    if (randomBetween(0,2) == 0) {this.isRightSwing = false}
    var opacity = randomBetween(1,10);
    var maxOpacity = opacity;
    var color;
    var opacityBoolean = true;

    this.control = function(){
        if (this.y > canvas.height + 100) {
            this.y = 0 - 100;
        } else if (this.y < 0 - 100) {
            this.y = canvas.height + 100;
        }
        if (this.x > canvas.width + 100) {
            this.x = 0 - 100;
        } else if (this.x < 0 - 100) {
            this.x = canvas.width + 100;
        }
        color = 'rgba(255,255,255,'+opacity+')';
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
        context.lineWidth = this.radius;
        context.shadowBlur = 15;
        context.shadowColor = 'gold';

        context.beginPath();
        context.arc(this.x,this.y,this.radius,Math.PI*2,false);
        context.fill();

        context.lineWidth = 1;
        context.shadowBlur = 0;
    }
}
