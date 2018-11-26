// console.log('js');

$(document).ready(readyFn);

function readyFn() {
    // console.log('jq working');
    clickListenerFn();
    getTaskFn();
}

function clickListenerFn() {
    $('#addTaskButton').on('click', addTaskFn);
    // $('#taskList').on('click', '.finishButton', finishFn);
    $('#taskList').on('click', `.checkButton`, completeCheckFn)
    $('#taskList').on('click', '.removeButton', removeFn);
}

function addTaskFn() {
    // console.log('add task button clicked');
    const important = $(`#importantIn[type='checkbox']`).is(":checked") // true of false if the button is checked
    const task = $('#taskIn').val()
    // console.log (task , important);
    const objectToSend = {
        task: task,
        important: important
    }
    // console.log(objectToSend);
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
    // console.log(this);
    let thisTask = $(this).closest('.card').data('object');
    console.log(thisTask)
    if ($(this).hasClass('notDone')) {
        console.log('this is check')
        $.ajax({
            method: "PUT",
            url: `/tasks/c/${thisTask.id}`
        }).then((response) => {
            // console.log(response);
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    } else {
        console.log('this is uncheck')
        $.ajax({
            method: "PUT",
            url: `/tasks/n/${thisTask.id}`
        }).then((response) => {
            // console.log(response);
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    }
}

function getTaskFn() {
    //get
    $.ajax({
        method: "GET",
        url: "/tasks"
    }).then((response) => {
        // console.log('have response');
        displayTaskFn(response);
    }).catch((err) => {
        console.log(err)
    })
}

function displayTaskFn(tasks) {
    // console.log('in display');
    $('#taskList').empty();
    for (const toDo of tasks) { // going through array of tasks/response
        // console.log(toDo);
        // let important;
        // switch (toDo.important) {
        //     case false:
        //         important = 'No';
        //         break;
        //     case true:
        //         important = 'Yes';
        // }
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
        if (toDo.complete === true){    // if task complete dont show the button
            // taskCard.find('.finishButton').addClass('hide'); //hide the button
            // taskCard.find('.finishButton').parent().text('Completed'); // insert Yes into it
            taskCard.addClass('p-3 mb-2 bg-info text-white'); // change color
            taskCard.find('.checkButton').data('check', 1); // make sure that the box is checked off when being append to DOM
            taskCard.find('.checkButton').addClass('btn btn-success done');
            taskCard.find('.checkButton').text('Completed');
        }
        if (toDo.important === true && toDo.complete === false) { // different color if important && make sure to not assign two class
            taskCard.addClass('p-3 mb-2 bg-primary text-white'); // change color
            taskCard.find('.checkButton').addClass('btn btn-secondary notDone');
        }
        if (toDo.important === false && toDo.complete === false){
            taskCard.addClass('p-3 mb-2 bg-light text-dark'); // change color
            taskCard.find('.checkButton').addClass('btn btn-secondary notDone');
        }
        taskCard.data('object', toDo);
        $('#taskList').append(taskCard);
    } // end of loop
}

// function finishFn(){
//     let thisTask = $(this).closest('tr').data('object');
//     console.log(thisTask, thisTask.id);
//     $.ajax({
//         method: "PUT",
//         url: `/tasks/${thisTask.id}`
//     }).then((response)=>{
//         console.log(response);
//         getTaskFn();
//     }).catch((err)=>{
//         console.log(err);
//     })
// }

function removeFn() {
    if (confirm('Are you sure you want to remove this task?')) {
        // console.log('REMOVING THIS!')
        let thisTask = $(this).closest('.card').data('object');
        console.log(thisTask, thisTask.id);
        $.ajax({
            method: "DELETE",
            url: `/tasks/${thisTask.id}`
        }).then((response) => {
            // console.log(response);
            getTaskFn();
        }).catch((err) => {
            console.log(err);
        })
    } else {
        //do nothing
    }
}