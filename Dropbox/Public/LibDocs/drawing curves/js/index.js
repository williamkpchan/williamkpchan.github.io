// Create Canvas.
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
// Store all particles.
var particles = [];
// The default colorset.

// Configure settings options
var config = {};
var settings = document.getElementById('settings');
initSettings();

// Init.
resize();
// Fire the Go! button.
settings.btnSet.onclick();
// Attach canvas.
document.body.appendChild(canvas);
// Begin drawing.
window.requestAnimationFrame(draw);
// Sync canvas to window.
window.onresize = resize;


function createBall (angle) {
  var n = 1;
  var origin = [
    canvas.width/2,
    canvas.height/2
  ]
  for (var i=0; i<n; i++) {
    particles.push(new particle({
      angle:angle,
      pos:[origin[0],origin[1]],
      size:config.size,
      speed:config.speed,
      index:i
    }));
  }
}

function start (delay) {
  clear();
  config.toCreate = config.num;
}

// Drawing.
var tick = 0;
function draw () {
  for (var i=0; i<particles.length; i++) {
    var p = particles[i];
    p.move();
    p.draw(ctx);
  }
  fade();
  window.requestAnimationFrame(draw);
  
  if (config.toCreate) {
    if (!(tick%(config.delay)))
      {
        createBall((180/config.num)*config.toCreate);
        config.toCreate--;
      }
  }
  tick++;
}


function particle (options) {
  this.angle = 0;
  this.curve = 0;
  this.pos = [0,0];
  this.size = 100;
  this.speed = 1;
  this.tick = 0;
  this.color = 'rgba(255,64,64,.95)';
  this.hue = 0;
  this.waveX = false;
  this.waveY = false;
  this.index = 0;
  
  // Override defaults.
  for (var i in options) {
    this[i] = options[i];
  }
  
  this.move = function () {
    this.angle += this.curve;
    var radians = this.angle*Math.PI/180;
    this.pos[0] += Math.cos(radians)*this.speed*Math.cos(this.tick/50),
    this.pos[1] += Math.sin(radians)*this.speed*Math.cos(this.tick/50);
    
    this.hue++
    this.color = 'hsl('+this.hue+', 100%, 45%)';
    this.tick++;
  }
  this.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0],this.pos[1],this.size,0,2*Math.PI);
    ctx.stroke();
  }
}

function preset (options) {
  for (var i in options) {
    if (settings[i].type == 'checkbox') {
      settings[i].checked = options[i];
      continue;
    }
    settings[i].value = options[i];
  }
  clear();
  settings.btnSet.onclick();
}

function fade () {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, .03)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
}
function clear () {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  particles.length = 0;
}
function resize () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


/* Common functions */

function rand(min, max) {
  return Math.random()*(max-min)+min;
}
function randColor(min, max) {
    var r = Math.floor(rand(min,max)),
        g = Math.floor(rand(min,max)),
        b = Math.floor(rand(min,max));
    return 'rgba('+r+','+g+','+b+',1)';
}

















// Settings

function preset (options) {
  for (var i in options) {
    settings[i].value = options[i];
  }
  settings.btnSet.onclick();
}

function initSettings () {
  settings.btnSet.onclick = function () {
    config.num = parseInt(settings.inNum.value);
    config.size = parseInt(settings.inSize.value);
    config.speed = parseInt(settings.inSpeed.value);
    config.delay = parseInt(settings.inDelay.value);

    start(config.delay);
  }

  // Presets.
  settings.preset0.onclick = function () {
    preset({
      inNum:20,
      inSize:20,
      inSpeed:5,
      inDelay:8
    });
  }
  settings.preset1.onclick = function () {
    preset({
      inNum:184,
      inSize:10,
      inSpeed:5,
      inDelay:6
    });
  }
  settings.preset2.onclick = function () {
    preset({
      inNum:79,
      inSize:10,
      inSpeed:5,
      inDelay:6
    });
  }
  settings.preset3.onclick = function () {
    preset({
      inNum:20,
      inSize:30,
      inSpeed:10,
      inDelay:3
    });
  }
  settings.preset4.onclick = function () {
    preset({
      inNum:80,
      inSize:2,
      inSpeed:20,
      inDelay:1
    });
  }
}