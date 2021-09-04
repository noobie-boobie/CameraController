window.addEventListener('load', ()=>{
        
    resize(); // Resizes the canvas once the window loads
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    //document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

console.log('Running main.js');

var ws_url = 'ws://' + window.location.host + '/ws/test/';

var socket = new WebSocket(ws_url);
var Finger, X, Y;
socket.onmessage = function (event){
    var data = JSON.parse(event.data);
    var finger = data.Finger;
    X = data.X;
    Y = data.Y;
    document.querySelector('#finger').innerHTML =finger;
    document.querySelector('#X').innerHTML =X;
    document.querySelector('#Y').innerHTML = Y;

    if(finger ==='1000') {
        document.querySelector('#finger').innerHTML = 'FIRST UP ONLY';
        move(X, Y);

    }
    else if(finger ==='1100') {
        document.querySelector('#finger').innerHTML = 'FIRST and Second UP';
        sketch(X, Y);
    }
}

const canvas = document.querySelector('canvas');
   

const ctx = canvas.getContext('2d');
    

function resize(){
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}



let coord = {x:0 , y:0}; 

let paint = false;
    

function getPosition(event){
  coord.x = X;
  coord.y = Y;
}
  

function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

function move(x, y){

}

function sketch(x, y){
    console.log('Sketch', x, y);
  ctx.beginPath();
    


  ctx.fillStyle = 'red';
  ctx.arc(x,y,10,0, Math.PI*2);
    ctx.fill();


}