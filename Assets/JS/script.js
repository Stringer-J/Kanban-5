// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("newDivArray"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const modal = document.getElementById("myModal"); // Get the modal
const span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const addButton = document.querySelector('.btn-success'); // Gets the 'add task' button
const addButton2 = document.querySelector('.btn-primary'); // Gets the second 'add task' button on the modal

const toDoBox = document.getElementById('todo-cards'); // Gets the box for to-do cards to go
const progressBox = document.getElementById('in-progress-cards');
const doneBox = document.getElementById('done-cards');

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
    // creates class of TaskCard to be called later as necessary
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

    const taskCard = new TaskCard(); // creates new instance of 'TaskCard'

    console.log(taskCard);

    createTaskCard(taskCard);
    closeModal(); // closes modal after form has been submitted
};

addButton2.addEventListener('click', generateTaskId); // adds event listener to button that captures form data on modal

const newDivArray = [];

// Todo: create a function to create a task card
function createTaskCard(taskCard) {
    if (taskCard) {
        const title = taskCard.title;
        const date = taskCard.date;
        const description = taskCard.description;
    
        if (title && date && description) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('newDiv');
    
            const title2 = document.createElement('h3');
            title2.textContent = `${title}`;
            newDiv.appendChild(title2);
    
            const line = document.createElement('hr');
            newDiv.appendChild(line);
    
            const date2 = document.createElement('p');
            date2.textContent = `${date}`;
            newDiv.appendChild(date2);
    
            const description2 = document.createElement('p');
            description2.textContent = `${description}`;
            newDiv.appendChild(description2);

            const deleteButton = document.createElement('button');
            newDiv.classList.add('newDiv');
            deleteButton.textContent = 'Delete';
            newDiv.appendChild(deleteButton);
    
            toDoBox.appendChild(newDiv);

            // $(newDiv).draggable();

            // Save the necessary data from newDiv into an object
            const taskData = {
                id: taskCard.id,
                title: title,
                date: date,
                description: description
            };

            newDivArray.push(taskData);

            localStorage.setItem('newDivArray', JSON.stringify(newDivArray));
        }
    }
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
    $("#todo-cards").droppable({
        drop: function(event, ui) {
          $(this).addClass("dropped");
          const droppedItem = ui.draggable;
          droppedItem.css('background-color', 'orange');
          alert("Item dropped inside #todo-cards!");
        }
      });
      $("#in-progress-cards").droppable({
        drop: function(event, ui) {
          $(this).addClass("dropped");
          const droppedItem = ui.draggable;
          droppedItem.css('background-color', 'green');
          alert("Item dropped inside #in-progress-cards!");
        }
      });
      $("#done-cards").droppable({
        drop: function(event, ui) {
          $(this).addClass("dropped");
          const droppedItem = ui.draggable;
          droppedItem.css('background-color', 'yellow');
          alert("Item dropped inside #done-cards!");
        }
      });
    });
