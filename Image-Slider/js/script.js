const pictures = [
    "contBcg-0",
    "contBcg-1",
    "contBcg-2",
    "contBcg-3",
    "contBcg-4"
];
const RightBtn = document.querySelector('.btn-right');
const LeftBtn = document.querySelector('.btn-left');
const MyImg = document.querySelector('.img-container');

RightBtn.addEventListener('click', nextImage);
LeftBtn.addEventListener('click', previousImage);

let count = 0, size = pictures.length;
function nextImage() {
    count++;
    count %= size;
    MyImg.style.backgroundImage = `url('img/${pictures[count]}.jpeg')`;
}

function previousImage() {
    if (count === 0) {
        count = size - 1;
    } else {
        count--;
    }
    MyImg.style.backgroundImage = `url('img/${pictures[count]}.jpeg')`;
}