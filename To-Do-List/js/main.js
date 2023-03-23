const Form = document.querySelector('form');
const task = document.querySelector('#task');
const taskList = document.querySelector('#todolist');

Form.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    if (task.value === '') {
        alert('Please Add A task!');
    } else {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const btn = document.createElement('button');

        span.textContent = task.value;
        span.contentEditable = true;
        btn.textContent = 'Delete';
        btn.className = 'btn btn-danger';
        btn.addEventListener('click', deleteTask);

        li.appendChild(span);
        li.appendChild(btn);
        taskList.appendChild(li);

        task.value = '';

    }

    function deleteTask(e) {
        const li = e.target.parentElement;
        taskList.removeChild(li);
    }
}

const mybutton = document.getElementById('topBtn');
const icon = document.getElementById('PageIcon');

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
        icon.style.display = "none";
    } else {
        mybutton.style.display = "none";
        icon.style.display = "block";
    }
}

mybutton.addEventListener('click', backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

