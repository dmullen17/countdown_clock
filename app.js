/* Define DOM elements and variables */
const timerDisplay = document.querySelector('.timer-display');
const menuItems = document.querySelectorAll('.menu-item');
const customMinutes = document.querySelector('#custom');
const returnTime = document.querySelector('.return-time');
const input = document.querySelector('input');

/* Define functions */
function formatTime(seconds) {
    let [minutesLeft, secondsLeft] = [Math.floor(seconds/60), seconds % 60]; 
    // Add a leading 0 to the single digit cases
    minutesLeft < 10 ? minutesLeft = `0${minutesLeft}` : minutesLeft;
    secondsLeft < 10 ? secondsLeft = `0${secondsLeft}` : secondsLeft;
    timerDisplay.innerText = `${minutesLeft}:${secondsLeft}`;
    // console.log(seconds);
}

function timer(seconds) {
    const timerInterval = setInterval(function() {
        if (seconds < 0) {
            clearInterval(timerInterval);
            return;
        }
        formatTime(seconds);
        seconds --;
    }, 1000);
}

function setReturnTime(seconds) {
    const date = new Date();
    let [hours, minutes] = [(date.getHours() % 12), date.getMinutes()];
    minutes += Math.ceil(seconds / 60);
    if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    returnTime.innerText = `Be back at ${hours}:${minutes}`;  
}

function startTimer() {
    const seconds = parseInt(this.dataset.time); 
    timer(seconds);
    setReturnTime(seconds);
}

function setCustomTimer(e) {
    e.preventDefault();
    //console.log(input.value);
    const seconds = input.value * 60;
    timer(seconds);
    setReturnTime(seconds);
}

/* Set up event listeners */ 
menuItems.forEach(menuItem => menuItem.addEventListener('click', startTimer));
customMinutes.addEventListener('submit', setCustomTimer);


/* Example of setInterval */
/*let i = 0;
let exampleInterval = setInterval(function(){
   if(i === 10){
      clearInterval(exampleInterval);
   }
   console.log(i);
   i++;
}, 1000);*/