
// ------------------------------

// I have removed Michael's form code that he gave to us because it was a lot and I wanted to understand my form step-by-step, so I am starting below from scratch.

// INITIAL LIST APPROACH, MOSTLY COMMENTED OUT BECAUSE I CHANGED IT A LITTLE LATER ON

let tasks = []

document.querySelector('#some-form').onsubmit = (event) => {
    event.preventDefault()
    let formData = new FormData(document.querySelector('#some-form'))

    let taskName = formData.get('task-text')

    let taskTime = formData.get('minutes')

    // For my initial approach, I attempted to create list items in the following manner - creating the variables above and then using textContent to generate the output list items.
    
    // let newListItem = document.createElement('li');

    // newListItem.textContent = `Task: ${taskName} // Minutes: ${taskTime}`


// For this logic, I understood the first few lines of code by simply following Eric's tutorial on json in forms, specifically 28:14-31:12
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


// NEW APPROACH

// I moved away from the above approach because appending directly to the DOM meant tasks would disappear on page refresh — nothing was being saved. I switched to storing tasks in LocalStorage first, then letting renderTasks() rebuild the entire list from scratch every time. Again, this was simply altered using Eric's tutorial after I went back and watched it.

// This meant the createElement + append logic was no longer needed here and moved into renderTasks() instead (this is why I did not enitrely delete the above explanations and dead code, it was linked to how I eventually came to the new approach).

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

// TASK LIMIT FUNCTION 

// Before pushing a new task, I check how many tasks are already in the array using .length - the length feature is something I picked up on during our links project and also found it again on mdn when trying to see how to identify how long an array is: 

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length 

// If there are already 12, I stop the function early with return so nothing gets added.

// I decided to limit number of tasks to 12 to make the list realistic and achievable for the user given the number of hours they have in a day.

// I used an alert to make it clear to the user why their task wasn't saved.

// Picked up on the alert method from class: https://typography-interaction-2526.github.io/topic/javascript/#2-wrapped-in-script-tags


     if (tasks.length >= 12) {                                                     
      alert('You have reached the max of 12 tasks')                             
      return                                  
    }                                                                             
// MINUTES LIMIT FUNCTION

// For the minutes, I also wanted to limit it to a certain number of minutes which one would have in a regular working day. 480 minutes seemed reasonable as that is 8 hours, which is max how much time you could spend working realistically, because you have to sleep etc. 

// I found out how to create this function by simply Googling 'how to sum array values javascript' and coming across this mdn explanation of reduce. 

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// At first I did not understand what 'initialValue' and 'accumulator' were, I just asked Gemini what those mean: https://gemini.google.com/share/a64cb68cc93f 

// I simply then rephrased the mdn function for my task array:

// In mdn, they declare an array at the beginning of the function, but mine has already been declared at the top of this file - 'tasks.'
// I then declare an initial value just like them.

    let initalValue = 0

// Next I create a variable for my total number of minutes by applying the reduce feature to my task array, and identifying my 'accumulator'(total) and 'currentValue'(task). I also had to add the 'number' thing because form inputs store everything as strings.

    let totalMinutes = tasks.reduce((total, task) => total + Number(task.time), 0)
    if (totalMinutes + Number(taskTime) > 480) {
      alert('Adding this task would exceed 480 minutes')                        
      return                                  
    }   

// If else function use is same as that in the task limit function.
   
    tasks.push(taskObject)

    // store tasks in localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}

// RENDER TASKS FUNCTION

// Gemini helped me debug several specific problems when building this function
// Link to convo: https://gemini.google.com/share/62537752a5f8

// One bug was a syntax/order of language issue: taskName and taskTime are declared inside onsubmit using let, which means they are invisible to renderTasks. Initially I did not understand that and was passing on empty variables. That is why I then created taskObject — instead of passing empty variables, I put task data into one object and push the whole thing to the array. renderTasks then reads from that array, not from those variables.

// Another bug was a 'ghost variable' — I had deleted newListItem from onsubmit but renderTasks was still referencing it. There was nothing there anymore so it broke silently.

// I also had a let bug: I wrote 'let taskObject.time = Number(...)' which is not valid. You can only use let when first declaring a variable, not when updating a property on an existing object. The fix was 'taskObject.time = Number(...)' without let.

// Another syntax issue I found inside the forEach: I was building taskItem inside the loop but trying to do innerHTML += outside it. The variable doesn't exist outside the curly braces, so the fix was to move innerHTML += inside the loop so it runs for every task.

// I also learned the difference between = and += for innerHTML. Using = overwrites everything already in the list, so only the last task would show. Using += appends to what is already there, so all tasks stack up correctly.

// The localStorage confusion Gemini helped clear up: tasks (no quotes) is my JavaScript variable. 'tasks' (with quotes) is just the label I use to store it in localStorage — they happen to share the same word but are completely unrelated things.

 let renderTasks = () => {                                                     
        let taskList = document.querySelector('#task-list')
        taskList.innerHTML = ''

        let tasks = localStorage.getItem('tasks')
        tasks = JSON.parse(tasks)           

// Before, if localStorage was empty the page was just blank. Now it checks if the tasks array is empty or doesn't exist yet — if so, it shows a  message and exits the function early with return so the loop doesn't run on nothing.   

// I got this idea to show this guide sentence as Michael said there should be some sort of indicator or intro if a user is adding tasks for the first time. This is very simple and I can make it prettier and maybe more copy for the next run. 

// To implement this I found this Stack overflow thread: https://stackoverflow.com/questions/61464941/display-message-if-array-is-empty 

        if (!tasks || tasks.length === 0) {                                       
         taskList.innerHTML = '<li class="empty">No tasks yet — add one below!</li>'
        return                                         }          

    tasks.forEach((taskObject) => {

    // Came up with dynamic sizing logic myself using if else logic, initially it was done in a minimal way below using only ranges that differentiated b/w 15, 30, and 60.
      
        // let className = ''
        // taskObject.time = Number(taskObject.time)

        // if (taskObject.time < 15) {
        //     className = 'small-task'
        // } else if (taskObject.time <= 30) {
        //     className = 'medium-task'
        // } else {
        //     className = 'large-task'
        // }

        // let span = taskObject.time < 15 ? 1 : taskObject.time <= 30 ? 2 : 3;
        
    // I then decided to make it more detailed for more dynamic sizing + better user experience. 

           let className = ''
           taskObject.time = Number(taskObject.time)

           if (taskObject.time < 10) {
           className = 'xsmall-task'
           } else if (taskObject.time < 20) {
           className = 'small-task'
           } else if (taskObject.time < 30) {
           className = 'medium-task'
           } else if (taskObject.time < 45) {
           className = 'large-task'
           } else if (taskObject.time < 60) {
           className = 'xlarge-task'
           } else {
           className = 'xxlarge-task'
           }

    let span                                                                    
           if (taskObject.time < 10) {             
           span = 1                                                               
           } else if (taskObject.time < 20) {                                            
           span = 2                                                                
           } else if (taskObject.time < 30) {                                            
           span = 3  
           } else if (taskObject.time < 45) {
           span = 4                               
           } else if (taskObject.time < 60) {      
           span = 5
           } else {                                                                      
           span = 6
           }                
      
// For the below code, I introduced a new concept which I found through Michael's link on our slack conversation. I asked how I could remove the task using the 'x' permanently, and he pointed me to the array (filter) method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter 

// Following this, I was reading this mdn documentation and then came across some 'index' method - it basically is when a number is given to a piece of information so that that single piece of information can be identified and referred to: 
// https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes 

// I then asked Gemini how I could incorporate this syntax into my current code, I understood the logic just needed help including it in the js syntax. I added the change to the html myself before asking gemini as that was easy. 

// The link to convo is in the main js file where I implemented the js

  let taskItem = `<li class="${className}" 
  data-index="${tasks.indexOf(taskObject)}" style="grid-column: span ${span}">  
    <span class="task-name">${taskObject.task}</span>
    <span class="task-time">${taskObject.time} min</span>
    <span class="close">X</span>                                                
  </li>`  


      taskList.innerHTML += taskItem
    })
}

renderTasks()

// continued to follow Eric's tutorial for the above chunk of code - assigning a value to each element so that it can be printed. 
// Specifically 49:20 - 51:11