
console.log('Running main.js');

var ws_url = 'ws://' + window.location.host + '/ws/test/';
var fire = false;
var drag =false;

var socket = new WebSocket(ws_url);
var finger, X, Y;

var Boxes = [];

function preloader() {
    console.log('Preloading Images');
    gi = new Image();
    bi = new Image();

    gi.src = groundImg;
    bi.src = ballImg;


}

// document.getElementById('ball').src = ballImg;
// document.getElementById('a').src = groundImg;
// document.getElementById('b').src = palmImg;
// document.getElementById('c').src = grabImg;

console.log(document.images);

socket.onopen = function (event){
    preloader();
}

socket.onclose = function (ev){
    alert('Connection closed');
}

socket.onerror = function (event) {
    alert('An error occured with the camera');
}

socket.onmessage = function (event){
    var data = JSON.parse(event.data);
    finger = data.Finger;
    X = data.X;
    Y = data.Y;


    if(finger ==='1000') {

        toDynamic();
        if(fire) shoot();
        moveHand(X, Y);

        drag =  handInBall();


    }
    else if(finger ==='1100') {

        if (drag) {

            toStatic();
            moveHand(X, Y);
            moveBall(X, Y);
            fire = true;
        }
    }
}

let engine = Matter.Engine.create();
let render = Matter.Render.create({
  element: document.body,
  engine:engine,
    options:{
      width: 1200,
      height: 620,
      background: '#87CEFA',
        wireframes: false
    }

});


let box = Matter.Bodies.rectangle(100,100,10,10,{ isStatic: true});
box.collisionFilter.mask = 0;

let platform = Matter.Bodies.rectangle(700,350,400,40,{ isStatic: true});

Boxes.push(new Box(600, 300));
Boxes.push(new Box(650, 300));
Boxes.push(new Box(700, 300));



Boxes.push(new Box(600, 250));
Boxes.push(new Box(650, 250));


Boxes.push(new Box(600, 200));
Boxes.push(new Box(650, 300));

Boxes.push(new Box(600, 150));
Boxes.push(new Box(650, 150));



for(let i = 0; i < Boxes.length; i++){
    Boxes[i].setProperties();
    Boxes[i].mass = 20;
    Boxes[i].show();
}

let ground = Matter.Bodies.rectangle(0,600,2000,40,{ isStatic: true});


let ball = Matter.Bodies.circle(150, 300,20);
ball.restitution = 0.5;
ball.mass = 100;


let sling = Matter.Constraint.create({
      pointA: { x: 150, y: 300 },
      bodyB: ball,
      stiffness: 0.02
  });


function moveBall(X, Y){
    Matter.Body.setPosition(ball, {x: 2*X-600, y: 2*Y-100});
}


ball.render.sprite.texture = ballImg;
ball.render.sprite.xScale = 0.12;
ball.render.sprite.yScale = 0.12;
box.render.sprite.texture = palmImg;
box.render.sprite.xScale = 0.3;
box.render.sprite.yScale = 0.3;
ground.render.sprite.texture = groundImg;
ground.render.sprite.xScale = 3;
platform.render.sprite.texture = groundImg;
platform.render.sprite.xScale = 0.7;


function handInBall(){
    var x1 = ball.position.x;
    var y1 = ball.position.y;

    var x2 = box.position.x;
    var y2 = box.position.y;

    var d = Math.sqrt((x1-x2)**2 + (y1-y2)**2)

    return d <= 30;
}

function moveHand(X, Y){
    Matter.Body.setPosition(box, {x: 2*X-600, y: 2*Y-100});
}

function toStatic(){
    ball.isStatic = true;
}

function toDynamic(){
    ball.isStatic = false;
}

function shoot(){
    ball.isStatic = false;
     fire = false;
     ball = Matter.Bodies.circle(150, 300,20);
     ball.restitution = 0.5;
     ball.render.sprite.texture = ballImg;
    ball.render.sprite.xScale = 0.12;
    ball.render.sprite.yScale = 0.12;
    setTimeout(function (){

         Matter.World.add(engine.world, ball);
         sling.bodyB = ball;

    }, 100);


}

function animate(){
    requestAnimationFrame(animate);

}

animate();

Matter.World.add(engine.world,[ground, sling, ball, box, platform]);
Matter.Runner.run(engine);
Matter.Render.run(render);