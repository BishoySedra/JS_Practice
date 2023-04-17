const equ = document.getElementById("display");
const equal = document.getElementById("=");
const del = document.getElementById("de");
const empty = document.getElementById("ac");
const math = document.getElementsByClassName("action");

for (var i = 0; i < math.length; i++) {
    math[i].addEventListener("click", function () {
        equ.value += this.innerHTML;
    });
}

del.addEventListener("click", function () {
    newValue = equ.value.slice(0, -1);
    equ.value = newValue;
});

empty.addEventListener("click", function () {
    equ.value = "";
});

equal.addEventListener("click", function () {
    if (equ.value !== "") {
        equ.value = eval(equ.value);
    }
    console.log(math);
});