// access the button in web page by the tag name
const btn = document.querySelector('button');

// access the text in web page by the tag name
const boldParagraph = document.querySelector('h1');

// function to generate random colors
function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    R = red, G = green, B = blue;
    const randomColor = { R: red, G: green, B: blue };

    return randomColor;
}

// function to return the hex value of each color
function rgbToHex(R, G, B) {
    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return '#' + rHex + gHex + bHex;
}

// function for button when click change the color of background and other things
btn.addEventListener('click', function () {

    // object has random degrees of rgb colors
    const randomColor = generateRandomColor();

    // color in hex value
    const hexColor = rgbToHex(randomColor.R, randomColor.G, randomColor.B);

    // change the background color
    document.body.style.backgroundColor = `rgb(${randomColor.R},${randomColor.G},${randomColor.B})`;

    // change text value with color hex value
    boldParagraph.textContent = 'hex color: ' + hexColor;

    // change text color to make it visible
    boldParagraph.style.color = 'white';
});

