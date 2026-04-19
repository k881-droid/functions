// You can put your individual, DOM-specific logic here.


// STRIKE THROUGH + DELETE FUNCTION

// The W3Schools tutorial gave the starting idea, same stuff from our class lecture — toggle a class on click to mark tasks done, and use a span with an × to delete by hiding the element. 

// https://www.w3schools.com/howto/howto_js_todolist.asp

// My first attempt used querySelector('span') to grab the close button and taskItem.classList.add('hide') to hide it. 

//This had two problems

//querySelector only ever grabs the first span on the entire page, and taskItem was a single li selected at the top — so it was never targeting whichever task was actually clicked. 

// Gemini helped me understand I needed event delegation — one listener on the whole taskList that checks event.target.tagName === 'SPAN' to catch whichever × was clicked. I then figured out I needed parentElement to travel one level up in the DOM from the clicked span to its wrapping li. Gemini confirmed this and pointed out the syntax fix: it needs to be event.target.parentElement not just parentElement alone, because javaScript needs to know whose parent to find.

// Link to the gemini conversation: https://gemini.google.com/share/70fad33a6d01 


let someForm = document.querySelector('#some-form')
let taskList = document.querySelector('#task-list')
let taskItem = document.querySelector('li')

 taskList.addEventListener('click', (event) => {    
  
  // Added an extra condition so the strikethrough only triggers on real task items, not the empty state message. classList.contains('empty') checks if the clicked item has the empty class — if it does, the whole condition is false and nothing happens. Did this myself because it follows basic class techniques.

    if (event.target.tagName === 'LI' &&  
  !event.target.classList.contains('empty')) {                                  
      event.target.classList.toggle('strikethrough');                           
    }

// DELETING FROM LOCAL STORAGE 

//previously the else if state was referring the span simply to a 'hide' class. After going through the mdn documentation on (filter) that Michael sent me, and then further finding that items can have 'indexes' in those documents, I tried to use that to delete a specific <li>. I used gemini's assistance to understand this further after struggling with the syntax. I was able to understand how to use data index and do the following to actually delete it from localStorage.

// first it reads the index number stored on the <li> — this tells us which task is clicked                                                                    
// Get the full task list from localStorage and convert it from text back into an array using the parse thing

// Go through the array and keep every task EXCEPT the one whose position matches the index we just read                                              

// Save the updated array back to localStorage                              

// Re-render the list so the UI matches what's now in localStorage

// link to conversation with Gemini: https://gemini.google.com/share/f4ae59c98237 

    else if (event.target.tagName === 'SPAN') {                                 
      let index = event.target.parentElement.dataset.index
      let tasks = JSON.parse(localStorage.getItem('tasks'))
      tasks = tasks.filter((task, i) => i !== Number(index))
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks()
    }                                                                           
  })         

// MOBILE BUTTON TOGGLE          

// On mobile, the task adder is hidden by default to save space. Clicking the + button toggles an 'open' class on the form section, which makes it appear. This follows the same class toggle pattern as the strikethrough above.
  
    let mobileBtn = document.querySelector('#mobile-add-btn')
    let formSection = document.querySelector('form > section:last-child')
                                                                                
  mobileBtn.addEventListener('click', () => { 
      formSection.classList.toggle('open')                                      
  })              
                                                                 
// MINUTE BUTTON SELECTOR

// Tapping a preset button fills the minutes input with that value and highlights it as active. If the user then types a custom number instead, the active highlight clears so it doesn't look like a button is still selected.   
                  
  let minuteBtns = document.querySelectorAll('#minute-buttons button')          
  let minutesInput = document.querySelector('#time-number')

// In between this I did not know the syntax for making the number on the button appear in the input field if the user clicked it. Gemini helped me with just that final line of this function: https://gemini.google.com/share/90115b91cadf 
                                                                                
  minuteBtns.forEach((btn) => {           
      btn.addEventListener('click', () => {
          minuteBtns.forEach((b) => b.classList.remove('active'))               
          btn.classList.add('active')         

// The below line is what I got from Gemini's assistance
          minutesInput.value = btn.dataset.minutes                              
      })          
  })                                                                            
   
// Button deselected if user starts typing in the input field 

  minutesInput.addEventListener('input', () => {                                
      minuteBtns.forEach((b) => b.classList.remove('active'))
  })       




