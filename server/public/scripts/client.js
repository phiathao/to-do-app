// console.log('js');

$(document).ready(readyFn);

function readyFn(){
    // console.log('jq working');
    clickListenerFn();
    getTaskFn();
}

function clickListenerFn(){
    $('#addTaskButton').on('click', addTaskFn);
}

function addTaskFn(){
    // console.log('add task button clicked');
    const important = $(`#importantIn[type='checkbox']`).is(":checked") // true of false if the button is checked
    const task = $('#taskIn').val()
    // console.log (task , important);
    const objectToSend = {
        task: task,
        important: important
    }
    console.log(objectToSend);
    $.ajax({
        method: "POST",
        url: "/tasks",
        data: objectToSend
    }).then((response)=>{
        getTaskFn();
    }).catch((err)=>{
        console.log(err);
    })
}

function getTaskFn(){
    //get
    $.ajax({
        method: "GET",
        url: "/tasks"
    }).then( (response)=>{
        // console.log('have response');
        displayTaskFn(response);
    }).catch( (err)=>{
        console.log(err)
    })
}

function displayTaskFn(tasks){
    // console.log('in display');
    $('#taskList').empty();
    for (const toDo of tasks){
        // console.log(toDo);
        let important;
        switch (toDo.important){
            case false:
                important = 'No';
                break;
            case true:
                important = 'Yes';
        }
        let taskTableRow = $(`
            <tr>
                <td>${toDo.task}</td>
                <td>${important}</td>
                <td><button class="finishButton">Finish</button></td>
                <td><button class="removeButton">Remove</button></td>
            </tr>
        `);
        if (toDo.complete === true){    // if task complete dont show the button
            taskTableRow.find('.finishButton').addClass('hide'); //hide the button
            taskTableRow.find('.finishButton').parent().text('Yes'); // insert Yes into it
            taskTableRow.addClass('table-success'); // change color
        }
        if (toDo.important === true && toDo.complete === false){ // different color if important && make sure to not assign two class
        }
        taskTableRow.data('object', toDo);
        $('#taskList').append(taskTableRow);
    }
}