class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.wall = null;
        this.treat = null;
    }

    show(){
        if(this.wall && !this.treat){
            stroke(255, 100);
            line(this.pos.x, this.pos.y, this.wall.x, this.wall.y);

            stroke(255);
            ellipse(this.wall.x, this.wall.y, 1);
        }
        if(this.treat){
            stroke(255, 100);
            line(this.pos.x, this.pos.y, this.treat.x, this.treat.y);

            fill(255, 0, 0);
            ellipse(this.treat.x, this.treat.y, 2);
        }
    }

    reset(){
        this.wall = null;
        this.treat = null;
    }

    setWall(wall){
        if(this.treat){
            let d1 = p5.Vector.dist(this.pos, this.treat);
            let a1 = Math.sign(this.pos.angleBetween(this.treat));
            let d2 = p5.Vector.dist(this.pos, wall);
            let a2 = Math.sign(this.pos.angleBetween(wall));
            if(d2 < d1 && a1 == a2){
                this.wall = wall;
                this.treat = null;
            }
        }else{
            this.wall = wall;
        }
    }

    setTreat(treat){
        if(this.wall){
            let d1 = p5.Vector.dist(this.pos, this.wall);
            let a1 = Math.sign(this.pos.angleBetween(this.wall));
            let d2 = p5.Vector.dist(this.pos, treat);
            let a2 = Math.sign(this.pos.angleBetween(treat));
            if(d2 < d1 && a1 == a2){
                this.wall = null;
                this.treat = treat;
            }
        }else{
            this.treat = treat;
        }
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

    getLineEquation(){
        let x1 = this.pos.x;
        let y1 = this.pos.y;
        let x2 = this.pos.x + this.dir.x;
        let y2 = this.pos.y + this.dir.y;

        var a = y2 - y1
        var b = x1 - x2
        var c = a*(x1) + b*(y1)
        // y = mx + n
        // ax + by = c  => y = (c - ax) / b => y = (-a/b)x + (c/b)
        var m = -a / b;
        var n = c / b;
        return [m,n];
    }

    castTreat(treat) {
        // circle: (x - h)^2 + (y - k)^2 = r^2
        // line: y = m * x + n
        // r: circle radius
        // h: x value of circle centre
        // k: y value of circle centre
        // m: slope
        // n: y-intercept

        let r = treat.r;
        let h = treat.pos.x;
        let k = treat.pos.y;
        let le = this.getLineEquation();
        let m = le[0];
        let n = le[1];
        var intersections = [];
        
        // get a, b, c values
        var a = 1 + sq(m); // m * m
        var b = -h * 2 + (m * (n - k)) * 2;
        var c = sq(h) + sq(n - k) - sq(r);
    
        // get discriminant
        var d = sq(b) - 4 * a * c;
        if (d >= 0) {
            // insert into quadratic formula
            intersections.push(createVector((-b + sqrt(sq(b) - 4 * a * c)) / (2 * a), 0));
            
            if (d > 0) {
                intersections.push(createVector((-b - sqrt(sq(b) - 4 * a * c)) / (2 * a), 0));
            }
        }
        
        for(let intersection of intersections){ // y = mx + n
            intersection.y = m * intersection.x + n;
        }

        // if(intersections.length > 0){
        //     console.log(intersections);
        // }

        return intersections;
    }
    
}