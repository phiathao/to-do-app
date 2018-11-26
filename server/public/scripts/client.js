
$(document).ready(readyFn);

function readyFn() {
    clickListenerFn();
    getTaskFn();
}

function clickListenerFn() {
    $('#addTaskButton').on('click', addTaskFn);
    $('#taskList').on('click', `.checkButton`, completeCheckFn)
    $('#taskList').on('click', '.removeButton', removeFn);
}

function addTaskFn() {
    const important = $(`#importantIn[type='checkbox']`).is(":checked") // true of false if the button is checked
    const task = $('#taskIn').val()
    const objectToSend = {
        task: task,
        important: important
    }
    $.ajax({
        method: "POST",
        url: "/tasks",
        data: objectToSend
    }).then((response) => {
        getTaskFn();
    }).catch((err) => {
        console.log(err);
    })
}

function completeCheckFn() {
    let thisTask = $(this).closest('.card').data('object');
    if ($(this).hasClass('notDone')) {
        $.ajax({
            method: "PUT",
            url: `/tasks/c/${thisTask.id}`
        }).then((response) => {
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    } else {
        $.ajax({
            method: "PUT",
            url: `/tasks/n/${thisTask.id}`
        }).then((response) => {
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    }
}

function getTaskFn() {
    $.ajax({
        method: "GET",
        url: "/tasks"
    }).then((response) => {
        displayTaskFn(response);
    }).catch((err) => {
        console.log(err)
    })
}

function displayTaskFn(tasks) {
    $('#taskList').empty();
    for (const toDo of tasks) {
        let taskCard = $(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${toDo.task}</h5>
                    <div class="card-text">
                        <button class="checkButton">Complete</button>
                        <button class="removeButton btn btn-danger">Remove</button>
                    </div>
                </div
            </div>
        `);
        // check - change color depend on important and complete
        if (toDo.complete === true){
            taskCard.addClass('p-3 mb-2 bg-info text-white'); // change bgcolor
            taskCard.find('.checkButton').addClass('btn btn-success done'); // change btn color
            taskCard.find('.checkButton').text('Completed');
        }
        if (toDo.important === true && toDo.complete === false) {
            taskCard.addClass('p-3 mb-2 bg-primary text-white'); // change color
            taskCard.find('.checkButton').addClass('btn btn-secondary notDone'); // change btn color
        }
        if (toDo.important === false && toDo.complete === false){
            taskCard.addClass('p-3 mb-2 bg-light text-dark'); // change color
            taskCard.find('.checkButton').addClass('btn btn-secondary notDone');
        }
        // end of check
        taskCard.data('object', toDo); //data object assign to card
        $('#taskList').append(taskCard);
    } // end of loop
}
function removeFn() {
    if (confirm('Are you sure you want to remove this task?')) {
        let thisTask = $(this).closest('.card').data('object');
        console.log(thisTask, thisTask.id);
        $.ajax({
            method: "DELETE",
            url: `/tasks/${thisTask.id}`
        }).then((response) => {
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    } else {
        //do nothing
    }
}