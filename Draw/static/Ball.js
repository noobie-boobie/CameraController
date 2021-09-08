class Ball{
    constructor(x = 150, y=300, r = 20) {
        this.ball  = Matter.Bodies.circle(x, y, r);
        this.x = x;
        this.y = y;
        this.r = r;
    }

    drag(X, Y){
        Matter.Body.setPosition(this.ball, {x: 2*X-600, y: 2*Y-100});
    }

    setProperties(){
        this.ball.restitution = 0.4;
        //this.ball.render.sprite.texture = ballImg;
        this.ball.render.sprite.xScale = 0.3;
        this.ball.render.sprite.yScale  = 0.3;
    }

    show(){
        Matter.World.add(engine.world, this.ball)
    }
}