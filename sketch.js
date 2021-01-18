var ball, database;
var position;

function setup(){
    database = firebase.database();

    createCanvas(500,500);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition = database.ref('ball/position');
    //Everytime a change in the database  of position (reference) happens, the readPosition function is called.
    //If there is any error in reading the values in the database, the showError function is called
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    
    if(position !== undefined) {
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0); //ball.x = ball.x - 1; ball.y = ball.y + 0
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
        drawSprites();
    }
}

function readPosition(data){
   position = data.val();

   //assign the x and y values of the ball position in the database to the ball sprite.
   ball.x = position.x;
   ball.y = position.y;
}

function showError(){
    console.log("Error in writing to the database");
}

function writePosition(x,y) {
    database.ref("ball/position").set({
        x: position.x + x,
        y: position.y + y
    });
}