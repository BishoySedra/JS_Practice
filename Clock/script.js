const secHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();

    let seconds = now.getSeconds();
    let secondsDegree = ((seconds / 60) * 360) + 90;
    secHand.style.transform = `rotate(${secondsDegree}deg)`;

    let minutes = now.getMinutes();
    let minutesDegree = ((minutes / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minutesDegree}deg)`;

    let hours = now.getHours();
    let hoursDegree = ((hours / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hoursDegree}deg)`;

    // console.log(seconds);
    // console.log(minutes);
    console.log(hours);
}

setInterval(setDate, 1000);