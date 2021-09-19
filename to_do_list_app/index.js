var display = document.querySelector('#showMessage');           // the div class we are to display the tasks on
var button = document.getElementById('button');                  // allows us to work with features on the button click
var taskInfoField = document.querySelector('#task');            // gets the input field data


var taskArray = [];                                             // initialize an array to contain all the tasks      
var index = 0;             

function getData(){                                             // function to get data and display upon button click
                             // gets the task from input with id 'task'
    if (taskInfoField.value === ""){
        alert("Enter valid Info!")

    } else{
        var taskInfo = taskInfoField.value;
        taskArray.push(taskInfo);                                   // add the ytask to taskarray
        index += 1
        arr_len = taskArray.length;


        var taskToDoBox = document.createElement('input');          // create a checkbox
        taskToDoBox.type = "checkbox";                      
        taskToDoBox.id = "chk";                                     // add an id

        var label = document.createElement('label')
        label.htmlFor = "chk"
        label.appendChild(document.createTextNode(taskArray[arr_len-1]))
        label.id = "text"

        var br = document.createElement("br");

        display.appendChild(taskToDoBox)
        display.appendChild(label)
        display.appendChild(br)
        taskInfoField.value = "";
    }
    

    

    taskToDoBox.addEventListener('change', function(){
        if(this.checked){
            display.removeChild(taskToDoBox);
            display.removeChild(label)
            display.removeChild(br);
        };
    })
}
