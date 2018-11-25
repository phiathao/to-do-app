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
    // console.log(objectToSend);
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

        $('#taskList').append(`
        <tr>
            <td>${toDo.task}</td>
            <td>${important}</td>
            <td><button>Finish</button></td>
            <td><button>Remove</button></td>
        </tr>
    `)
    }
}