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
    if (event.target.tagName === 'LI' &&  
  !event.target.classList.contains('empty')) {                                  
      event.target.classList.toggle('strikethrough');                           
    }
    else if (event.target.tagName === 'SPAN') {                                 
      let index = event.target.parentElement.dataset.index;
      let tasks = JSON.parse(localStorage.getItem('tasks'));                    
      tasks = tasks.filter((task, i) => i !== Number(index));
      localStorage.setItem('tasks', JSON.stringify(tasks));                     
      renderTasks();                          
    }                                                                           
  })              
      




