class Treat{
    constructor(x, y){
        this.pos = createVector(x, y);
        this.r = 10;
    }

    show(){
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r);
    }
}