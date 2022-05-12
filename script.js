const textwrapper = document.querySelector('.text-wrapper');
const textArea = document.querySelector('#textArea');
const originText = document.querySelector('.text').innerHTML;
const resetButton = document.querySelector('#reset');
const theTimer = document.querySelector('.timer');

let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;

//Add leding zero to numbers 9
function leadingZero(time) {
    if(time <= 9) {
        time = "0" + time;
    }

    return time;0
}

// Create a clock 
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] *60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Reset everything
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    textArea.value = "";
    theTimer.innerHTML = "00:00:00";

    textwrapper.style.borderColor = 'green';
}

// Match the text with the provided text on the page
function spellCheck() {
    let textEnetered = textArea.value;
    let originTextMatch = originText.substring(0, textEnetered.length);
    
    if(textEnetered == originText) {
        textwrapper.style.borderColor = 'orange';
        clearInterval(interval);
    } else {
        if (textEnetered == originTextMatch) {
            textwrapper.style.borderColor = 'green'; 
        } else {
            textwrapper.style.borderColor = 'red';
        }
    }
}

// Start the timer
function start() {
    let textEnteredLength = textArea.value.length;
    if(textEnteredLength === 0) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Event listeners for keyboard input and reset button events
textArea.addEventListener('keypress', start, false);
textArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', reset, false);
