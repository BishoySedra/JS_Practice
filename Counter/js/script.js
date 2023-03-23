const lowerBtn = document.querySelector('.prevBtn');
const addBtn = document.querySelector('.nextBtn');
const counterElement = document.getElementById('counter');
let cnt = 0;

addBtn.addEventListener('click', increase);
lowerBtn.addEventListener('click', decrease);

function setColor() {
  if (cnt > 0) {
    counterElement.style.color = 'green';
  } else if (cnt < 0) {
    counterElement.style.color = 'red';
  } else {
    counterElement.style.color = 'black';
  }
}

function increase() {
  cnt++;
  counterElement.textContent = cnt;
  setColor();
}

function decrease() {
  cnt--;
  counterElement.textContent = cnt;
  setColor();
}
