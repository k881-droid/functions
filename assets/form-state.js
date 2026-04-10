
// ------------------------------

// I have removed Michael's form code that he gave to us because it was a lot and I wanted to understand my form step-by-step, so I am starting below from scratch.

let tasks = [];

document.querySelector('#some-form').onsubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(document.querySelector('#some-form'));
   
    let taskName = formData.get('task-text'); 
    
    let taskTime = formData.get('minutes'); 
    
    // let newListItem = document.createElement('li');

    // newListItem.textContent = `Task: ${taskName} // Minutes: ${taskTime}`


// For the above logic, I understood the first few lines of code by simply following Eric's tutorial on json in forms, specifically 28:14-31:12
//https:www.loom.com/share/3f81aa35dde54e6fb28e7d301b76c396?t=1655

// Once Eric continued to move past this point and get into the 'keys' and 'values' part of 'FormData,' I began to get confused. That is when I started to reference Gemini for help. I began by asking it more about the FormData element, after which it helped me understand the different ways you can use FormData to show data. This began to make more sense to me than the keys stuff in the tutorial. More specifically, I understood that they 'key' is basically the name of the object, and the 'value' is all the different inputs that come under a single 'key'. For example, 'task name' is my key and 'shower' would be my value. 

// I then continued to chat with it by making up an example of a form that is not directly my project but has similar logic - sports and their difficulty levels. 

// In the middle there was some basic syntax I messed up because I was understanding the logic, but another challenge I face with JS is that I don't understand what order to write the lines, even if I am slowly understanding what the different words mean. I was mashing up the submit syntax with the task list syntax, and it helped me fix that. 

//A really big understanding it helped me come to, myself, whilst acting like my teacher, was the 'append' idea. I finally understood that to save the tasks on the empty div in my html, it has to 'add' an extra html element to the already entered inputs that the users are giving to the form. This is what causes them to then appear as individual new inputs in the previously empty div. 

// With this sort of back-and-forth, it was able to help me understand the different steps I have to take to collect data once it has been inputted.

// Link to this Gemini Conversation: https://gemini.google.com/share/0abdb9c1c3eb 

// Also, in between these steps, after I did it correctly, I still shortly ran into a typo which was causing a null error. I used Gemini to help trouble shoot that briefly. Link to this conversation: https://gemini.google.com/share/5bc6a2121bc4

    
    // let className = '';
    // let timeNumber = Number(taskTime); 

    // if (timeNumber < 15) {
    //     className = 'small-task';
    // } else if (timeNumber >= 15 && timeNumber <= 30) {
    //     className = 'medium-task';
    // } else if (timeNumber > 30) {
    //     className = 'large-task';
    // }

    // if (className !== '') {
    //     newListItem.classList.add(className); 
    // }

// For the above code, I didn't really ask for LLM help and came up with the logic myself, because I knew roughly the ranges I wanted to apply for the small, medium and large css classes to take effect. I used one of our first JS lectures to come up with this: https://typography-interaction-2526.github.io/topic/javascript/#loops 

// And also mdn's lecture on if else logic to make sure I was using the correct syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else#:~:text=English%20(US),Try%20it 


    // document.querySelector('#task-list').append(newListItem)

 
    let taskObject = {
        task: taskName, 
        time: taskTime, 
    }

    // get tasks from local storage

    let tasks = localStorage.getItem('tasks')
    
    // tasks may not exist at this point 
    if (!tasks) {
    // if there are no tasks, set it to an empty array 
      tasks = []
    // if there are tasks, parse them from how they were stored in local storage
    } else {
      tasks = JSON.parse(tasks)
    }

    tasks.push(taskObject)

    // store tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}

let renderTasks = () => {
    let taskList = document.querySelector('#task-list')
    taskList.innerHTML = ''

    let tasks = localStorage.getItem('tasks')
    tasks = JSON.parse(tasks)

    tasks.forEach((taskObject) => {
      
        let className = '';
        taskObject.time = Number(taskObject.time); 

        if (taskObject.time < 15) {
        className = 'small-task';
        } else if (taskObject.time >= 15 && taskObject.time <= 30) {
        className = 'medium-task';
        } else if (taskObject.time > 30) { className = 'large-task';
        }
        
      let taskItem =
      `<li class="${className}"> Task: ${taskObject.task} // Minutes: ${taskObject.time} <span class="close">X</span></li>`

      taskList.innerHTML += taskItem
    })
}

renderTasks()

// continued to follow Eric's tutorial for the above chunk of code - assigning a value to each element so that it can be printed. I think this is necessary for the next step, which will be integrating this into localStorage (I assume we cannot add stuff to localStorage without a key and a value because that is how things are organized in it.)
// Specifically 49:20 - 51:11