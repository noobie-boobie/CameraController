class Box{
    constructor(x, y, w = 50, h= 50) {
        this.box  = Matter.Bodies.rectangle(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }


    setProperties(){
         this.box.restitution = 0.4;
         this.box.render.sprite.texture = grabImg;
         this.box.render.sprite.xScale = 0.1;
         this.box.render.sprite.yScale  = 0.1;
    }

    show(){
        Matter.World.add(engine.world, this.box)
    }
}