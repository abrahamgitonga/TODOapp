const taskInput = document.querySelector(".task_input input"),
filters = document.querySelectorAll(".filter-bar span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task_box"), 
descriptionBox = document.querySelector("#description")
// dateInput =document.getElementById(".dateInput input");
// timeInput =document.getElementById(".timeInput input");





let editId,
isEditedTask =false,
// timeInput,
// dateInput,


//getting localstorage todo list
todos =JSON.parse(localStorage.getItem("todo_list"));


filters.forEach(btn =>{
    btn.addEventListener("click",() => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});
// get elements

   



function addEntry(event){
    let dateValue = dateInput.value;
    dateInput.value ="";
}


function showTodo(filter){
    let li = "";
    if(todos) {
    todos.forEach((todo, id) => {
        //if todo status is completed set isComplete value checked
        let isCompleted = todo.statusbar =="completed" ? "checked" : "";
        if(filter == todo.statusbar || filter == "all"){
            li += `<li class="task">
            <label for="${id}" class="task-label">
                <input type="checkbox" id="${id}" onclick="updateStatus(this)" ${isCompleted}>
                <p ${isCompleted}>${todo.name}</p>
                <p>${todo.description}</p>
                <p>${todo.statusbar}</p>
                <p>Created Date: ${todo.date}</p>
                <p>Submitted Time: ${todo.time}</p>
                


            </label>
            <div class="settings">
                <i class="fa-solid fa-ellipsis" onclick="showMenu(this)"></i>
                <ul class="task_menu">
                    <li onclick="editTask(${id},'${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                    <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                </ul>
            </div>
            </li>`;
            console.log(id)

        }
      
    
    });
   }


    taskBox.innerHTML = li || `<span>You dont have any tasks yet!</span>`;
    let checkTask =taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask){
    //getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });


}

function editTask(taskId, taskName){
    editId =taskId;
    isEditedTask = true;
    taskInput.value =taskName;
    taskInput.focus();
    taskInput.classList.add("active");
}
function deleteTask(deleteId,filter){
    //deleting selected task from array
    isEditedTask = false; 
    todos.splice(deleteId, 1);
    localStorage.setItem("todo_list",JSON.stringify(todos));
    showTodo(filter);

}
clearAll.addEventListener("click",() =>{
    isEditedTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo_list",JSON.stringify(todos));
    showTodo();

});

function updateStatus(selectedTask){
    //getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        //updating tasks to competed
        todos[selectedTask.id].statusbar="completed";
    }else{
        taskName.classList.remove("checked");
        //updating tasks to pending
        todos[selectedTask.id].statusbar="pending";

    }
    localStorage.setItem("todo_list",JSON.stringify(todos));

}

taskInput.addEventListener("keyup", e => {
    let userTask =taskInput.value.trim();
    let dateTask = dateInput.value;
    let timeTask = timeInput.value;
    let taskDescription = descriptionBox.value;
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            todos =!todos ? [] : todos;
            let taskInfo = {name: userTask, statusbar: "pending", date: dateTask, time: timeTask, description: taskDescription};
            todos.push(taskInfo);//adding new tasks

        }else{
            isEditedTask = false;
            todos[editId].name = userTask;
        }
      
        taskInput.value ="";
        dateInput.value ="";
        timeInput.value ="";
        taskDescription ="";
        localStorage.setItem("todo_list",JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

// dateInput.addEventListener("keyup", e =>{
//     let taskDate = dateInput.value.trim();
//     if(e.key =="Enter" && taskDate){


//         dateInput.value ="";

//     }
// });

// timeInput.addEventListener("keyup", e =>{
//     let taskTime = timeInput.value.trim();
//     if(e.key =="Enter" && taskTime){


//         timeInput.value ="";

//     }
// });