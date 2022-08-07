class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.wall = null;
    }

    show(){
        if(this.wall){
            stroke(255, 100);
            line(this.pos.x, this.pos.y, this.wall.x, this.wall.y);

            stroke(255);
            ellipse(this.wall.x, this.wall.y, 1);
        }
    }

    setWall(dir){
        this.wall = dir;
    }

    cast(wall){
        let x1 = wall.a.x;
        let y1 = wall.a.y;
        let x2 = wall.b.x;
        let y2 = wall.b.y;
        let x3 = this.pos.x;
        let y3 = this.pos.y;
        let x4 = this.pos.x + this.dir.x;
        let y4 = this.pos.y + this.dir.y;

        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if(den == 0){
            return;
        }

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        let u = - ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

        if(t > 0 && t < 1 && u > 0){
            let pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        }else{
            return;
        }
    }
}