let followMouse = false; // takes priority, lamp will simply follow the mouse
let keyControls = true; // if both followMouse and keyControls are false, the lamp will move randomly with perlin noise
let manualWallsMode = false;
let showWalls = false; // set to false for great experience
let gameMode = true;
let showTreats = false;

let lamp_speed = 5; // only when keyControls is true and followMouse is false
let whichWalls = 0; // 0 is for random. you can add you own walls to the generateWalls() function
let walls_count = 5; // only if manualWallsMode is false, walls will be randomly generated
let treats_count = 5;
let whichTreats = 0;
let light_radius = 45; // should be between 1 and 90
let full_light_allowed = 5;

let canvas_width = 1500;
let canvas_height = 800;


//* you can change the above values


let walls = [];
let lamp;
let xoff = 0;
let yoff = 5000;
let wallStartPt = null;
let mousePt = null;
let manualTreatsMode = false;
let treats = []; // only when gameMode is true
let full_lights_used = 0;
let total_treats_collected = 0;
let treats_left = 0;

function setup() {
  createCanvas(canvas_width, canvas_height);

  lamp = new Lamp(light_radius);

  if(!manualWallsMode){
    generateWalls(whichWalls);
  }

  if(gameMode && !manualWallsMode){
    generateTreats(whichTreats);
  }

  // edges
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
}

function printWalls(){
  let m = '';
  for(let i = 4; i < walls.length; i++){
    let wall = walls[i];
    m += 'walls.push(new Wall(' + wall.a.x + ',' + wall.a.y + ',' + wall.b.x + ',' + wall.b.y + '));\n';
  }
  console.log(m);
}
function printTreats(){
  let m = '';
  for(let treat of treats){
    m += 'treats.push(new Treat(' + treat.pos.x + ',' + treat.pos.y + '));\n';
  }
  console.log(m);
}

function draw() {
  background(0);

  if(manualWallsMode){
    if(wallStartPt && mousePt){
      stroke(255);
      line(wallStartPt.x, wallStartPt.y, mousePt.x, mousePt.y);
    }

    for(let wall of walls){
      wall.show();
    }
    for(let treat of treats){
      treat.show();
    }
  }else{
    lamp.show();
    lamp.look(walls, treats);
    if(followMouse){
      if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        lamp.follow(mouseX, mouseY);
      }
    }else if(keyControls){
      keyboardControls();
    }else{
      lamp.follow(noise(xoff) * width, noise(yoff) * height);
      xoff += 0.01;
      yoff += 0.01;
    }

    if(showWalls){
      for(let wall of walls){
        wall.show();
      }
    }
    if(showTreats){
      for(let treat of treats){
        treat.show();
      }
    }
    var t = collectedTreat();
    if(t >= 0){
      treats.splice(t, 1);
      total_treats_collected++;
      console.log('collected treats: ' + total_treats_collected);
      treats_left = treats.length;
      console.log('treats left: ' + treats_left);
      if(treats.length == 0){
        console.log('game over');
        resetGame();
      }
    }
  }

}

function collectedTreat() {

  for(let i = 0; i < treats.length; i++){
    var a = lamp.size + treats[i].r;
    var x = lamp.pos.x - treats[i].pos.x;
    var y = lamp.pos.y - treats[i].pos.y;

    if (a > Math.sqrt((x * x) + (y * y))) {
      return i;
    }
  }
  return -1;
}

function mouseClicked(){
  if(manualWallsMode){
    if(manualTreatsMode){
      treats.push(new Treat(mouseX, mouseY));
    }else{
      if(wallStartPt){
        walls.push(new Wall(wallStartPt.x, wallStartPt.y, mouseX, mouseY));
        wallStartPt = null;
        mousePt = null;
      }else{
        wallStartPt = createVector(mouseX, mouseY);
      }
    }
  }
}

function mouseMoved(){
  if(manualWallsMode && wallStartPt){
    mousePt = createVector(mouseX, mouseY);
  }
}

function keyboardControls(){
  if(keyIsDown(87) && keyIsDown(65)){ // up left
    lamp.moveControls(-lamp_speed, -lamp_speed);
  }else if(keyIsDown(87) && keyIsDown(68)){ // up right
    lamp.moveControls(lamp_speed, -lamp_speed);
  }else if(keyIsDown(83) && keyIsDown(65)){ // down left
    lamp.moveControls(-lamp_speed, lamp_speed);
  }else if(keyIsDown(83) && keyIsDown(68)){ // down right
    lamp.moveControls(lamp_speed, lamp_speed);
  }else if(keyIsDown(87)){ // up
    lamp.moveControls(0, -lamp_speed);
  }else if(keyIsDown(83)){ // down
    lamp.moveControls(0, lamp_speed);
  }else if(keyIsDown(65)){ // left
    lamp.moveControls(-lamp_speed, 0);
  }else if(keyIsDown(68)){ // right
    lamp.moveControls(lamp_speed, 0);
  }
}

function keyPressed(){
  if(keyCode == 32){ // space bar
    if(manualWallsMode && !manualTreatsMode){
      printWalls();
      manualTreatsMode = true;
      wallStartPt = null;
      mousePt = null;
    }else if(manualWallsMode && manualTreatsMode){
      printTreats();
      manualTreatsMode = false;
      manualWallsMode = false;
    }else{
      if(full_lights_used < full_light_allowed){
        lamp.showAll();
        full_lights_used++;
      }
    }
  }
}

function resetGame(){
  walls = [];
  treats = [];

  if(!manualWallsMode){
    generateWalls(whichWalls);
  }

  if(gameMode && !manualWallsMode){
    generateTreats(whichTreats);
  }

  // edges
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(width, 0, width, height));
  walls.push(new Wall(width, height, 0, height));
  walls.push(new Wall(0, height, 0, 0));
  full_lights_used = 0;
}

function generateTreats(where){
  switch(where){
    case 0:
      for(let i = 0; i < treats_count; i++){
        let x = random(width);
        let y = random(height);
        treats.push(new Treat(x, y));
      }
      break;
    case 1:
      // put your treats here
  }
  treats_left = treats.length;
}

function generateWalls(where){
  switch(where){
    case 0:
      for(let i = 0; i < walls_count; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls.push(new Wall(x1, y1, x2, y2));
      }
      break;
    case 1:
      // put your walls here
  }
}
