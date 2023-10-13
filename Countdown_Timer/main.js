const restart_button = document.getElementById("restart");
const start_button = document.getElementById("start");
const stop_button = document.getElementById("stop");
const reset_button = document.getElementById("reset");
const countdown_container = document.getElementById("countdown");
const seconds_input = document.getElementById("timer-input");;

let interval, seconds = 0;

function updateDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    countdown_container.textContent = `${String(
        minutes
    ).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function startTimer() {
    const inputField = seconds_input;

    if (!seconds) {
        seconds = parseInt(inputField.value, 10);
    }

    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid number of seconds.");
        inputField.value = "";
        return;
    }

    updateDisplay();
    start_button.disabled = true;
    stop_button.disabled = false;
    reset_button.disabled = false;

    interval = setInterval(function () {
        seconds--;
        updateDisplay();
        if (seconds === 0) {
            stopTimer();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
    start_button.disabled = false;
    stop_button.disabled = true;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    start_button.disabled = false;
    stop_button.disabled = true;
    reset_button.disabled = true;
    seconds = 0;
    updateDisplay();
}

function restartTimer() {
    const inputField = document.getElementById("timer-input");

    seconds = parseInt(inputField.value, 10);

    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid number of seconds.");
        inputField.value = "";
        return;
    }

    updateDisplay();
    start_button.disabled = true;
    stop_button.disabled = false;
    reset_button.disabled = false;

    if (!interval) {
        interval = setInterval(function () {
            seconds--;
            updateDisplay();
            if (seconds === 0) {
                stopTimer();
            }
        }, 1000);
    }
}

restart_button.addEventListener("click", restartTimer)
start_button.addEventListener("click", startTimer);
stop_button.addEventListener("click", stopTimer);
reset_button.addEventListener("click", resetTimer);