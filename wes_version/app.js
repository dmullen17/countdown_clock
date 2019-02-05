let countdown; // could pop this in an IIFE to remove from global
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers 
    clearInterval(countdown);
    
    const now = Date.now(); //gives us the current time stamp
    const then = now + seconds * 1000;
    //console.log({now, then});
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop 
        if (secondsLeft <= -0) { // Math.round must set it to -0
            //console.log('hi');
            clearInterval(countdown);
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
 }

function displayTimeLeft(seconds) {
    //console.log(seconds);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = (seconds % 60);
    const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    timerDisplay.textContent = display;
    // Update the title of the tab
    document.title = display;
}


function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hours > 12 ? hours -12 : hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    //console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})

// On iOS when you're scrolling it will pause setInterval
// 
/*function timer(seconds) {
    setInterval(function() {
        seconds --;
    }, 1000);
}*/