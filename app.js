//define UI var
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//call loadEventListeners function
loadEventListeners();

//loadEventListeners function
function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event - event delegation - add event listener to ul(parentElement)
    taskList.addEventListener('click', removeTask);
    //clear tasks
    clearBtn.addEventListener('click', clearTask);
    //filter task event
    filter.addEventListener('keyup', filterTasks);

}

//Get Task from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        //Create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fas fa-trash"></i>';
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    })
  
}


//Add task function
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add a task')
    }
    else {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fas fa-trash"></i>';
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
        //store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //console.log(taskList);
        //console.log(li);
        //Clear input
        taskInput.value = '';
        
        e.preventDefault();
    }
}

// store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  



//remove task function
function removeTask(e) {
    
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            //console.log( e.target.parentElement.parentElement)
            e.target.parentElement.parentElement.remove();
            
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
    //console.log(taskItem);
    let tasks;
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++){
        if (taskItem.textContent===tasks[i]) {
            tasks.splice(i, 1);
        }
        console.log(tasks);
    }
          
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear tasks function
function clearTask(e) {
    // taskList.innerHTML = '';
    //faster removeChild vs innerHTML
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear task from local storage
    cleartaskFromLocalStorage();
}

//clear tasks from local storage
function cleartaskFromLocalStorage() {
    localStorage.clear();
}


//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //console.log(text);
    document.querySelectorAll('.collection-item').forEach
        (function (task) {
            const item = task.firstChild.textContent;
            //console.log(item);
            if (item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        })
}

