// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const modal = document.getElementById("myModal"); // Get the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const addButton = document.querySelector('.btn-success'); // Gets the 'add task' button
const addButton2 = document.querySelector('.btn-primary');

const openModal = () => {modal.style.display = 'block'};
const closeModal = () => {
    modal.style.display = 'none';
    document.getElementById('titleBox').value='';
    document.getElementById('datepicker').value='';
    document.getElementById('descriptionBox').value='';
};

addButton.addEventListener('click', openModal); // Adds event listeners to the 'add task' button and the 'x' to close the modal
span.addEventListener('click', closeModal);

// Todo: create a function to generate a unique task id
function generateTaskId() {
    class TaskCard {
        constructor() {
            this.id = generateUniqueId();
            this.title = document.getElementById('titleBox').value;
            this.date = document.getElementById('datepicker').value;
            this.description = document.getElementById('descriptionBox').value;
        }
    }

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric ID
    }

    const taskCard = new TaskCard();

    console.log(taskCard);
};

addButton2.addEventListener('click', generateTaskId);















































// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
