var ms = 0, s = 0, m = 0, h = 0;
var timer;

var display = document.querySelector(".timer-Display");
var laps = document.querySelector(".laps");

var hourHand = document.querySelector('.hour-hand');
var minuteHand = document.querySelector('.minute-hand');
var secondHand = document.querySelector('.second-hand');
var millisecondHand = document.querySelector('.millisecond-hand');



function start() {
    if (!timer) {
        timer = setInterval(run, 10);
    }
}

function run() {
    display.innerHTML = getTimer();
    ms++;
    if (ms == 100) {
        ms = 0;
        s++;
    }
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    if (h == 13) {
        h = 1;
    }

    updateHands();
}

function getTimer() {
    return (h < 10 ? "0" + h : h) + " : " + (m < 10 ? "0" + m : m) + " : " + (s < 10 ? "0" + s : s) + " : " + (ms < 10 ? "0" + ms : ms);
}

function updateHands() {
    const millisecondDegree = ms * 3.6; // 360 degrees in 100 milliseconds
    const secondDegree = (s + ms / 100) * 6;
    const minuteDegree = (m + s / 60) * 6;
    const hourDegree = (h % 12 + m / 60) * 30;

    millisecondHand.style.transform = `rotate(${millisecondDegree}deg)`;
    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
}

function pause() {
    stopTimer();
}

function stopTimer() {
    clearInterval(timer);
    timer = false;
}

function reset() {
    stopTimer();
    ms = 0;
    s = 0;
    m = 0;
    h = 0;
    display.innerHTML = getTimer();
    resetHands();
}

function resetHands() {
    millisecondHand.style.transform = `rotate(0deg)`;
    secondHand.style.transform = `rotate(0deg)`;
    minuteHand.style.transform = `rotate(0deg)`;
    hourHand.style.transform = `rotate(0deg)`;
}

function restart() {
    if (timer) {
        reset();
        start();
    }
}

function lap() {
    if (timer) {
        var Li = document.createElement("li");
        Li.innerHTML = getTimer();
        laps.appendChild(Li);
    }
}

function resetLap() {
    laps.innerHTML = "";
}




