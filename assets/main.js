// You can put your individual, DOM-specific logic here.

// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }


// cross out function - comments of links that assisted to be added 
// https://www.w3schools.com/howto/howto_js_todolist.asp
// https://gemini.google.com/share/88834d47de2c 


let someForm = document.querySelector('#some-form')
let taskList = document.querySelector('#task-list')
let taskItem = document.querySelector('li')

 taskList.addEventListener('click', (event) => {    
  
  // Added an extra condition so the strikethrough only triggers on real task items, not the empty state message. classList.contains('empty') checks if the clicked item has the empty class — if it does, the whole condition is false and nothing happens.

    if (event.target.tagName === 'LI' &&  
  !event.target.classList.contains('empty')) {                                  
      event.target.classList.toggle('strikethrough');                           
    }

// previously this else if state was referring the span simply to a 'hide' class. upon taking gemini's assistance, i was able to understand how to use data index and do the following (this is my understanding of what's happening, Gemini did not tell me this to this extent):

// first it reads the index number stored on the <li> — this tells us which task is clicked                                                                    
// Get the full task list from localStorage and convert it from text back into an array using the parse thing

// Go through the array and keep every task EXCEPT the one whose position matches the index we just read                                              

// Save the updated array back to localStorage                              

// Re-render the list so the UI matches what's now in localStorage

// link to conversation with Gemini: https://gemini.google.com/share/f4ae59c98237 

    else if (event.target.tagName === 'SPAN') {                                 
      let index = event.target.parentElement.dataset.index;
      let tasks = JSON.parse(localStorage.getItem('tasks'));                    
      tasks = tasks.filter((task, i) => i !== Number(index));
      localStorage.setItem('tasks', JSON.stringify(tasks));                     
      renderTasks();                          
    }                                                                           
  })              
      




