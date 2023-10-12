// const amount = document.querySelector(".amount input");
// const fromContainer = document.querySelectorAll(".from select option");
// const toContainer = document.querySelectorAll(".to select option");

// const from = () => {
//     fromContainer.forEach((elem) => {
//         if (elem.selected === true) {
//             return elem;
//         }
//     })
// }

// const to = () => {
//     return toContainer.find((elem) => elem.selected === true);
// }

// console.log(from);
// console.log(to);
// console.log(amount.value);

// async function convertAmount() {
//     let value = amount.value;


// }

const drop_lists = document.querySelectorAll(".drop-list select");
const drop_imgs = document.querySelectorAll(".select-box img");
const get_button = document.querySelector("form button");
const amount = document.querySelector(".amount input");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const exchange_rate_container = document.querySelector(".exchange-rate");
const switch_icon = document.querySelector(".icon");

// to display country names as options
for (let i = 0; i < drop_lists.length; i++) {
    for (country_name in country_list) {
        let option = document.createElement("option");
        let selected;
        if (i === 0) {
            selected = (country_name === "USD") ? "Selected" : "";
        } else if (i == 1) {
            selected = (country_name === "EGP") ? "Selected" : "";
        }
        option.textContent = country_name;
        option.value = country_name;
        option.selected = selected;
        drop_lists[i].appendChild(option);
    }

    drop_lists[i].addEventListener("change", (e) => {
        changeFlag(e.target);
    });
}

drop_imgs[0].src = `https://flagcdn.com/48x36/${country_list[from.value].toLowerCase()}.png`
drop_imgs[1].src = `https://flagcdn.com/48x36/${country_list[to.value].toLowerCase()}.png`;

function changeFlag(target) {
    let img = target.parentNode.querySelector("img");
    img.src = `https://flagcdn.com/48x36/${(country_list[target.value]).toLowerCase()}.png`
    console.log(img);
}

switch_icon.addEventListener("click", (e) => {
    e.preventDefault();
    let name_temp = from.value;
    from.value = to.value;
    to.value = name_temp;
    changeFlag(from);
    changeFlag(to);
});

// what happened when get exchange rate button is clicked
get_button.addEventListener("click", (e) => {
    e.preventDefault();
    convertCurrency();
});

// what happened to convert currencies
async function convertCurrency() {
    let amount_value = amount.value;
    let from_currency = (from.value).toLowerCase();
    let to_currency = (to.value).toLowerCase();

    let fromCurrencyCall = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from_currency}.min.json`);
    fromCurrencyCall = await fromCurrencyCall.json();

    let convertedAmount = (amount_value * fromCurrencyCall[from_currency][to_currency]).toFixed(3);

    exchange_rate_container.textContent = `Getting exchange rate...`;
    addConvertedAmountToDOM(convertedAmount);

    console.log(convertedAmount);
}

// adding the converted amount to HTML Page
function addConvertedAmountToDOM(convertedAmount) {
    exchange_rate_container.textContent = `${amount.value} ${from.value} = ${convertedAmount} ${to.value}`
}

// for debugging
console.log(drop_lists);
console.log(drop_imgs);
console.log(country_list["USD"]);
console.log(amount.value);
console.log(from.value);
console.log(to.value);
console.log(country_list[from.value].toLowerCase());
console.log(country_list[to.value].toLowerCase());