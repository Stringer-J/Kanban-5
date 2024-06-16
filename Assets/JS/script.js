let newDivArray = JSON.parse(localStorage.getItem("newDivArray")) || [];

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

// Todo: create a function to create a task card
function createTaskCard(taskCard) {
    if (taskCard) {
        const title = taskCard.title;
        const date = dayjs(taskCard.date);
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
            deleteButton.textContent = 'Delete';
            newDiv.appendChild(deleteButton);

            deleteButton.addEventListener('click', function() {
                // Remove newDiv from the DOM
                newDiv.remove();
    
                // Remove corresponding taskData from newDivArray
                newDivArray = newDivArray.filter(item => item.id !== taskCard.id);
    
                // Update localStorage
                localStorage.setItem('newDivArray', JSON.stringify(newDivArray));
            });

            const due = dayjs();

            if(date.isSame(due, 'day')) {
                newDiv.style.backgroundColor = 'yellow';
            } else if(date.isBefore(due, 'day')) {
                newDiv.style.backgroundColor = 'green';
            } else if(date.isAfter(due, 'day')) {
                newDiv.style.backgroundColor = 'red';
            }
    
            toDoBox.appendChild(newDiv);

            // Save the necessary data from newDiv into an object
            const taskData = {
                id: taskCard.id,
                title: title,
                date: date.format('YYYY-MM-DD'),
                description: description,
                status: 'todo'
            };

            newDivArray.push(taskData);

            localStorage.setItem('newDivArray', JSON.stringify(newDivArray));

            $(newDiv).draggable();
        }
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    let taskList = JSON.parse(localStorage.getItem("newDivArray")) || [];

    $("#todo-cards, #in-progress-cards, #done-cards").droppable({
        drop: function(event, ui) {
            $(this).addClass("dropped");
            const droppedItem = ui.draggable;
            // Remove any existing positioning style added by jQuery UI draggable
            droppedItem.css({top: 0, left: 0, position:'relative'});

            // Get the drop target
            const dropTarget = $(this);
            
            // Find the last child element in the drop target
            const lastItem = dropTarget.children('.newDiv').last();
            
            // Append the dropped item right after the last child
            if (lastItem.length > 0) {
                droppedItem.insertAfter(lastItem);
            } else {
                dropTarget.append(droppedItem);
            }
    
            // Get the status based on the droppable area id
            let status;
            if ($(this).attr('id') === 'todo-cards') {
                status = 'todo';
            } else if ($(this).attr('id') === 'in-progress-cards') {
                status = 'inprogress';
            } else if ($(this).attr('id') === 'done-cards') {
                status = 'done';
            }
    
            // Update the status of the dropped task in taskList
            taskList.forEach(taskData => {
                if (taskData.title === droppedItem.find('h3').text()) {
                    taskData.status = status;
                }
            });
    
            // Save the updated taskList to localStorage
            localStorage.setItem("newDivArray", JSON.stringify(taskList));
        }
    });

    if (taskList) {
        taskList.forEach(taskData => {
            const due = dayjs(); // Set now to taskData.date for each task
    
            const newDiv = document.createElement('div');
            newDiv.classList.add('newDiv');
    
            const title2 = document.createElement('h3');
            title2.textContent = taskData.title;
            newDiv.appendChild(title2);
    
            const line = document.createElement('hr');
            newDiv.appendChild(line);
    
            const date = dayjs(taskData.date);
            const date2 = document.createElement('p');
            date2.textContent = date.format('YYYY-MM-DD');
            newDiv.appendChild(date2);
    
            const description2 = document.createElement('p');
            description2.textContent = taskData.description;
            newDiv.appendChild(description2);
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            newDiv.appendChild(deleteButton);

            deleteButton.addEventListener('click', function() {
                // Remove newDiv
                newDiv.remove();
    
                // Remove corresponding taskData from newDivArray
                newDivArray = newDivArray.filter(item => item.id !== taskCard.id);
    
                // Update localStorage
                localStorage.setItem('newDivArray', JSON.stringify(newDivArray));
            });
    
            // Append newDiv to the correct card container based on status
            if (taskData.status === 'todo') {
                $('#todo-cards').append(newDiv);
            } else if (taskData.status === 'inprogress') {
                $('#in-progress-cards').append(newDiv);
            } else if (taskData.status === 'done') {
                $('#done-cards').append(newDiv);
            }
    
            // Make newDiv draggable using jQuery UI
            $(newDiv).draggable();
    
            // Set background color based on task's date compared to now
            if (date.isSame(due, 'day')) {
                newDiv.style.backgroundColor = 'yellow';
            } else if (date.isBefore(due, 'day')) {
                newDiv.style.backgroundColor = 'green';
            } else if (date.isAfter(due, 'day')) {
                newDiv.style.backgroundColor = 'red';
            }
        });
    }
    
    
});
