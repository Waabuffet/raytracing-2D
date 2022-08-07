class Lamp{
    constructor(light_radius){
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.raysToShow = [];
        this.light_radius = light_radius;
        this.distance_from_wall_to_block = 10;

        for(let a = 0; a < 360; a += 1){
            this.rays.push(new Ray(this.pos, radians(a)));
        }

        for(let ray of this.rays){
            this.raysToShow.push(ray);
        }
    }

    show(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        if(this.raysToShow.length > 0){
            for(let ray of this.raysToShow){
                ray.show();
            }
        }
    }

    showAll(){
        this.raysToShow = [];
        for(let ray of this.rays){
            this.raysToShow.push(ray);
        }
    }

    follow(x, y){
        this.pos.set(x, y);
    }

    canMove(){
        for(let ray of this.raysToShow){
            if(ray.wall){
                let d = p5.Vector.dist(this.pos, ray.wall);
                if(d <= this.distance_from_wall_to_block){
                    return false;
                }
            }
        }
        return true;
    }

    moveControls(x, y){
        let start = 0;
        let stop = 0;
        this.raysToShow = [];
        if(x == 0 && y < 0){ // up
            start = Math.round(90 - this.light_radius / 2);
            stop = Math.round(90 + this.light_radius / 2);
        }else if(x == 0 && y > 0){ // down
            start = Math.round(270 - this.light_radius / 2);
            stop = Math.round(270 + this.light_radius / 2);
        }else if(x < 0 && y == 0){ // left
            start = Math.round(360 - this.light_radius / 2);
            stop = 359;
            for(let i = 0; i <= Math.round(this.light_radius / 2); i++){
                Math.round(this.raysToShow.push(this.rays[i]));
            }
        }else if(x > 0 && y == 0){ // right
            start = Math.round(180 - this.light_radius / 2);
            stop = Math.round(180 + this.light_radius / 2);
        }else if(x < 0 && y < 0){ // up left
            start = Math.round(45 - this.light_radius / 2);
            stop = Math.round(45 + this.light_radius / 2);
        }else if(x > 0 && y < 0){ // up right
            start = Math.round(135 - this.light_radius / 2);
            stop = Math.round(135 + this.light_radius / 2);
        }else if(x < 0 && y > 0){ // down left
            start = Math.round(315 - this.light_radius / 2);
            stop = Math.round(315 + this.light_radius / 2);
            stop = (stop >= 360)? 359 : stop;
        }else if(x > 0 && y > 0){ // down right
            start = Math.round(225 - this.light_radius / 2);
            stop = Math.round(225 + this.light_radius / 2);
        }
        for(let i = start; i <= stop; i++){
            this.raysToShow.push(this.rays[i]);
        }
        if(this.canMove()){
            this.pos.set(this.pos.x + x, this.pos.y + y);
        }
    }

    look(walls){
        for(let ray of this.rays){
            let closestPt = null;
            let record = Infinity;
            for(let wall of walls){
                let pt = ray.cast(wall);

                if(pt){
                    let d = p5.Vector.dist(this.pos, pt);
                    if(d < record){
                        record = d;
                        closestPt = pt;
                    }
                    record = min(d, record);
                }
            }

            if(closestPt){
                ray.setWall(closestPt);
            }
        }
    }
}