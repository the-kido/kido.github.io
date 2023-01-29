

const hitMe = document.querySelector("#hitme"); //The circle
const scoreboard = document.querySelector("#scoreboard") //The bg text

const myObserver = new ResizeObserver(() => {

    const physicalScreenSize = window.devicePixelRatio || 1;
    console.log(physicalScreenSize);
    // Calculate the number of pixels per inch
    const pixelsPerInch = window.screen.width / physicalScreenSize;
    
    // Set the size of the element in pixels
    const desiredPhysicalSize = 20; // 1 centimeter
    const desiredPixelSize = desiredPhysicalSize * pixelsPerInch * 2.54 / 1000;
    hitMe.style.width = desiredPixelSize + "px";
    hitMe.style.height = desiredPixelSize + "px";

    scoreboard.innerHTML = physicalScreenSize.toString() + " <br> " + desiredPixelSize;
}).observe(document.body);



//#region Assistance from https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript 
var body = document.body; 
var html = document.documentElement;
//just use the biggest value (so any that isn't 0)
var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
//#endregion

//Game values
var hitCount = 0,   //The amount of times the player hit the circle
    high,           //Previous high (score)
    speed = 100,    // 1 is a second. if speed was 2, it would be 0.5 seconds
    time = 0;       //Time (goes down scaled by speed)

//Elements refered to throughout the script
var hitSounds = [ //Itemframe hit sounds 1-4 from the minecraft sound files (all rights go to them). Used purely for demonstration.
    document.getElementById("hit1"), 
    document.getElementById("hit2"),
    document.getElementById("hit3"),
    document.getElementById("hit4"),
]
var boom = document.getElementById("boom"); //The vine thud sound effect 

function getTargetPos(){
    var rect = hitMe.getBoundingClientRect();
    return {
        x: (rect.right + rect.left) /2,
        y: (rect.bottom + rect.top) /2
    };
}


var getDistance = (x1, x2, y1, y2) => { return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}

function onMouseClicked(event) {

    var distance = getDistance( 
        getTargetPos().x, event.clientX,  
        getTargetPos().y, event.clientY,  
    );
    
    if (distance < 30) hitCircle();
}


function updateScoreboard(){
    scoreboard.innerHTML = "Time: " + Math.round(time) + 
    " <br> Speed: " + Math.round (speed) + "%" +
    "<br>" + "Score: " + hitCount + 
    "<br>" + "High: " +  high;
}


function hitCircle(){} //Depending on the case this function may or may not be implemented 

function enableCircle(bool){
    if(bool){
        hitCircle = () => {
            hitCount++;
            time += 100; // equal to 1 second
            hitMe.style.left = Math.round((Math.random() * 90) + 5 /*To avoid going too far of course*/ ).toString() + "%";
            hitMe.style.top = Math.round((Math.random() * 80) + 10 /*same as above*/                    ).toString() + "%";
            updateScoreboard();
            hitSounds[Math.floor(Math.random() * 4)].play()
        };
    }else{
        hitCircle = () => {};
    }
}

function startGame(){
    document.removeEventListener("click", startGame);

    enableCircle(true);

    if(time == 0){
        setTimeout(startGame, 10);
        return;
    }
    
    updateScore();
}

function updateScore(){
    time -= speed/100;
    speed += 0.1;
    
    updateScoreboard();

    if(time <= 0){
        gameOver();
        return;
    }

    setTimeout(updateScore, 10);
}

function gameOver(){
    
    high = Math.max(high, hitCount);
    localStorage.setItem('highscore', high);
    time = 0;
    speed = 100;

    scoreboard.innerHTML =
    "<span class='passive'>" + "<br>" + "<br>" +
    "Score: " + hitCount + " <--" + 
    "<br>" + "High: " +  high;

    hitCount = 0; //Just so it doesn't get cleared beforehand.

    hitMe.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--mid');

    boom.play();
    boom.currentTime = 0.1;

    enableCircle(false);

    setTimeout(() => {
        hitMe.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--highlight');
        document.addEventListener("click", startGame);
        enableCircle(true);
    }, 1000);
}

(function init(){
    document.addEventListener("click", startGame);
    document.addEventListener("click", onMouseClicked);

    high = parseInt(localStorage.getItem('highscore'));
    if (isNaN(high)){
        high = 0;
    }
})();