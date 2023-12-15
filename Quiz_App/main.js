let countSpan = document.querySelector(".count span");
let spansContainer = document.querySelector(".bullets .spans");
let quizAreaContainer = document.querySelector(".quiz-area");
let answerAreaContainer = document.querySelector(".answers-area");
let submit_btn = document.querySelector(".submit-button");
let bulletsContainer = document.querySelector(".bullets");
let resultsContainer = document.querySelector(".results");
let countdownContainer = document.querySelector(".countdown");


let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
const duration = 120;

async function getData() {
    try {
        const data = await fetch("./html_questions.json");
        const questionsData = await data.json();
        const questionsCnt = questionsData.length;

        createBullets(questionsCnt);
        addQuestionData(questionsData[currentIndex], questionsCnt);

        countdown(duration, questionsCnt);

        submit_btn.onclick = () => {

            let { right_answer } = questionsData[currentIndex];
            // console.log(right_answer);

            checkAnswer(right_answer);

            // console.log(`right ans is ${right_answer}`);
            // console.log(`chosen ans is ${chosenAnswer}`);

            // remove the previous question
            quizAreaContainer.innerHTML = '';
            answerAreaContainer.innerHTML = '';

            // add new question
            addQuestionData(questionsData[currentIndex], questionsCnt);

            // handle bullets spans
            handleBullets();

            // countdown
            clearInterval(countdownInterval);
            countdown(duration, questionsCnt);

            // show results
            showResults(questionsCnt);
        }


        // console.log(questionsData);
    } catch (error) {
        console.log('Error: ', error);
    }
}

function countdown(duration, cnt) {
    if (currentIndex < cnt) {
        let minutes, seconds, timer;
        countdownInterval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            timer = `${minutes}:${seconds}`;

            countdownContainer.textContent = timer;

            duration--;

            if (duration < 0) {
                clearInterval(countdownInterval);
                submit_btn.click();
            }
        }, 1000);
    }
}


function showResults(cnt) {
    if (currentIndex === cnt) {
        quizAreaContainer.remove();
        answerAreaContainer.remove();
        submit_btn.remove();
        bulletsContainer.remove();

        let results;
        if (rightAnswers > (cnt / 2) && rightAnswers < cnt) {
            results = `<span class = "good">Good</span> You Solved ${rightAnswers} from ${cnt}`;
        } else if (rightAnswers === cnt) {
            results = `<span class = "perfect">Perfect</span> You Solved ${rightAnswers} from ${cnt}`;
        } else {
            results = `<span class = "bad">Bad</span> You Solved ${rightAnswers} from ${cnt}`;
        }

        resultsContainer.innerHTML = results;
    }
}

function handleBullets() {
    let bulletSpans = document.querySelectorAll(".bullets .spans span");
    bulletSpans = Array.from(bulletSpans);
    console.log(bulletSpans);

    bulletSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    })
}

function checkAnswer(right_answer) {
    let chosenAnswer;

    let allAnswers = document.getElementsByName("question");

    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].checked) {
            chosenAnswer = allAnswers[i].dataset.answer;
        }
    }

    if (chosenAnswer === right_answer) {
        rightAnswers++;
        console.log("Good Answer!");
    }

    currentIndex++;

}

function createBullets(num) {

    countSpan.innerHTML = num;

    for (let index = 0; index < num; index++) {

        let newSpan = document.createElement("span");

        if (index === 0) {
            newSpan.className = "on";
        }

        spansContainer.appendChild(newSpan);

    }

}

function addQuestionData(obj, num) {

    if (currentIndex < num) {
        let QuestionTitle = document.createElement("h2");
        QuestionTitle.textContent = obj["title"];

        quizAreaContainer.appendChild(QuestionTitle);

        for (let i = 1; i <= 4; i++) {
            let mainDiv = document.createElement("div");
            mainDiv.className = "answer";

            // create radio button
            let radioInput = document.createElement("input");

            radioInput.type = "radio";
            radioInput.id = `answer_${i}`;
            radioInput.name = `question`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            if (i === 1) {
                radioInput.checked = true;
            }

            // create label 
            let label = document.createElement("label");

            // create for attribute
            label.htmlFor = radioInput.id;
            // create text
            label.textContent = obj[`answer_${i}`];

            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(label);

            answerAreaContainer.appendChild(mainDiv);
        }
    }

}

getData();