var startTime, interval;
let timer = document.getElementById('cubingTimer');


window.addEventListener('keydown', (e) => {
    if (e.keyCode === 32 && e.target === document.body) {  
        e.preventDefault();
        console.log("SpaceDown");
    }
}, true);



function start(){
    startTime = Date.now();
    interval = setInterval(function(){
        updateDisplay(Date.now() - startTime);
    });
}




function stop(){
    clearInterval(interval);
}

function updateDisplay(currentTime){
    // do your stuff
}
