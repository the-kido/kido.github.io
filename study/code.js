var styleVariables = document.getElementById('css variables')

function changeTheme(hightlightColour, midColour, bgColour){

    styleVariables.innerHTML =
    `:root{
        --highlight:  ` + hightlightColour + `;
        --mid:        ` + midColour + `;
        --bg:         ` + bgColour + `;
    }`
}


//let's get itt
var motivation = document.getElementById("motivation")
//finalDate = new Date("January 1, 2024 12:00:00 GMT-04:00");
var finalDate = new Date("December 25, 2023 24:00:00 GMT-04:00"); // Mine is 2023 not 2026

var uniDate = new Date("September 1, 2024 24:00:00 GMT-04:00"); // Mine is 2023 not 2026

//I am considering that 1/12 of my day is spent on coding. If 1/2 is spent sleeping that means 1/6 is spent coding.
var workingRate = 1/6;

(function updateTimers(){
    date = new Date();
    var time = (finalDate.getTime() - date.getTime()) / 1000;
    var uniTime = (uniDate.getTime() - date.getTime()) / 1000;
    
    motivation.innerHTML =

    '<span class="emphasis">'+ Math.floor(time) 
    + '<span class="passive">  seconds | ' 
    + '<span class="emphasis">' + Math.floor(time/60)
    + '<span class="passive">  minutes | ' 
    + '<span class="emphasis">' + Math.floor(time/60/60)
    + '<span class="passive">  hours | ' 
    + '<span class="emphasis">' + Math.floor(time/60/60/24) 
    + '<span class="passive">  days '
    + "<br>If you work for 4 hours a day, you have <span class='emphasis'>" + Math.floor(time/60/60 * workingRate) + "<span class='passive'>  hours left"
    + "<br>University starts in <span class='emphasis'>" + Math.floor(uniTime/60/60/24) + "<span class='passive'> days" 
    ;


    setTimeout(updateTimers, 999); //Once a second for fun
})();


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var spinnys = document.querySelectorAll("#spinny");
var main = document.getElementById("mainman");

var speed = [0.05,0.05,0.05,0.05,0.05];
console.log(spinnys);

var index = [0,0,0,0,0,0];

(function spin(){

    for (var i = 0; i < spinnys.length; i++) {
        var sin = Math.pow( Math.sin(index[i]), 2) 
        
        index[i] = (index[i] + speed[i]) % (2 * Math.PI);
    
        //style="transform: rotate(45deg);
        spinnys[i].style.transform = "rotate("+sin*360+"deg)"
        
        var code = rgbToHex(
            20,     
            Math.abs(parseInt(sin * 100) ) + 70, 
            Math.abs(parseInt(sin * 100) ) + 65 
        );
    
        spinnys[i].style.background = code;

    }
    
    setTimeout(spin, 50);
})();


var getDistance = (x1, x2, y1, y2) => { return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}

function getTargetPos(target){
    var rect = target.getBoundingClientRect();
    return {
        x: (rect.right + rect.left) /2,
        y: (rect.bottom + rect.top) /2
    };
}

function getSpinnyDistance(event){

    for (var i = 0; i < spinnys.length; i++) {
        var distance = getDistance( 
            getTargetPos(spinnys[i]).x, event.clientX,  
            getTargetPos(spinnys[i]).y, event.clientY,  
        );
        
        var thing = Math.abs (1 - distance/document.body.scrollWidth);
            
        speed[i] = 0.1 * thing;

    }
}

function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month + 1, 0).getDate();  
}
function getDayDif(){
    
    var date = new Date();
    var time = (finalDate.getTime() - date.getTime())/1000;

    var currentMonth = date.getMonth();
    var finalMonth = finalDate.getMonth();

    var sum = 0;

    for(var i = 0, dif = finalMonth - currentMonth; i < dif; i++ ){
        sum += daysInMonth(
            currentMonth, 
            date.getFullYear() + Math.floor( (currentMonth + 1)/12 )  
        )
        console.log(sum);
    }
    console.log(sum);  
    return Math.floor(time/60/60/24) - sum;

}

var inspiration = document.getElementById("inspiration");

//All messages to be displayed all pretty :)
var messages = [
    () => {
        date = new Date();
        var time = (finalDate.getTime() - date.getTime())/1000;
        var months = Math.floor(time/60/60/24/30);
        var totalDays = Math.floor(time/60/60/24/30/24);
    
        //return months + " months and " + getDayDif() + " days to make something brilliant ";
        return months + " months to make something brilliant ";
    },
    () => {
        return "Be proactive"
    },
    () => {
        return "You should probably take a break if you're here."
    },
    () => {
        return "If you feel overwhelmed, write things down. You will be more reasonable then"
    },
    () => {
        return "Maybe reference your agenda"
    },
    () => {
        return "Whatever you do, don't get distracted. It's the best thing you can do"
    },
    () => {
        return "Hocus Pocus try to focus!"
    }
]

var updateIndex = 0;
(function updateMessage(){
    
    inspiration.innerHTML = messages[updateIndex]();
    updateIndex = (updateIndex + 1) % messages.length;
    setTimeout(updateMessage, 120000 / 4); //120000 == 2 mins

})();

var themes = [

    ["#cbd8aa", "#b18c76", "#241c1c"],  //Farmers market
    ["#cfc582","#b68751","#144641"],    //the 50's
    ["#e36a6a","#638b8e","#2a2828"],    //rubies and sapphire
]

var themeIndex = 1;
(function changeThemePeriodically(){
    changeTheme(themes[themeIndex][0], themes[themeIndex][1], themes[themeIndex][2] )
    themeIndex = (themeIndex + 1) % themes.length
    setTimeout(changeThemePeriodically, 360000 / 12); //Remove 12 to reduce theme-change speed.
})();

var oofSound = document.getElementById("oofsound")

document.addEventListener('visibilitychange', function(event) {
    if (false){ //usually document.hidden
        oofSound.play().then(
            () =>  {},
            () =>  {}
        ) ;
    }
});


hitMe = document.getElementById("hitme");

function getPos(element) {
    var rect = element.getBoundingClientRect();
    return {
        x : (rect.right + rect.left) /2 ,
        y : (rect.bottom + rect.top) /2
    };
}

function printMousePos(event) {

    var xDif = (getPos(hitMe).x - event.clientX) / document.body.scrollWidth*100
    var yDif = (getPos(hitMe).y - event.clientY) / document.body.scrollHeight*100

    var r = 3;
    

    if ( (xDif > -r && xDif < r) && (yDif > -r && yDif < r) ){

        hitMe.style.left = Math.round(Math.random() * 20).toString() + "%";
        hitMe.style.top = Math.round( (Math.random()) * 20).toString() + "%";
    }else{
        
    }
}
document.onmousemove = getSpinnyDistance;

document.addEventListener("click", printMousePos);