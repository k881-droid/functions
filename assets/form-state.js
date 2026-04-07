// // Target your form.
// let formElement = document.querySelector('#some-form')

// // Function to match the form to URL/stored params.
// let updateForm = (params) => {
// 	// Parse into params:
// 	// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
// 	params = new URLSearchParams(params)

// 	// Our friend, the `forEach` loop:
// 	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// 	params.forEach((value, key) => {
// 		// Find them by their ID.
// 		let inputOrSelect = document.getElementById(key)

// 		if (inputOrSelect) {
// 			// Set the actual input to the param value.
// 			inputOrSelect.value = value
// 		} else {
// 			// Radios are a bit different, find them by `name` attribute.
// 			document.querySelectorAll(`[name=${key}]`).forEach((element) => {
// 				if (value == element.value) { // Check the one matching the param value.
// 					element.checked = true
// 				}
// 			}
// 		)
// 		}
// 	})

// 	// And a callback! This function is defined over in `main.js`, for clarity.
// 	stateCallback?.()
// 	// The `?.` is optional chaining:
// 	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// }

// // Function to save them to `localStorage`.
// let storeParams = () => {
// 	// Get the form data:
// 	// https://developer.mozilla.org/en-US/docs/Web/API/FormData
// 	let formParams = new FormData(formElement)

// 	// Loop through each key/value pair.
// 	formParams.forEach((value, key) => {
// 		// And save them out to the browser:
// 		// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// 		localStorage.setItem(key, value)
// 	})
// }

// // Function to update the URL from the form.
// let updateUrlParams = () => {
// 	let formParams = new FormData(formElement) // Get the form data.

// 	formParams = new URLSearchParams(formParams) // Make it into params.
// 	formParams = formParams.toString() // And then into a string.

// 	// You could also write this as:
// 	// let formParams = new URLSearchParams(new FormData(formElement)).toString()

// 	// Update the URL with the params at the end.
// 	history.replaceState(null, null, '?' + formParams)
// 	// We use `history` here (instead of `location`) to not get into an infinite loop!
// 	// https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState

// 	// And also store them!
// 	storeParams()

// 	// And a callback!
// 	stateCallback?.()
// }



// // First, check for query/params in the URL:
// // https://developer.mozilla.org/en-US/docs/Web/API/Location/search
// if (location.search) {
// 	let urlParams = location.search // Get the query string.

// 	updateForm(urlParams) // Update the form from these.
// }
// // Otherwise check for saved params in storage.
// else if (localStorage.length > 0) {
// 	let storedParams = Object.entries(localStorage) // Get the saved params.

// 	updateForm(storedParams) // Update the form from these.
// }


// // Watch for events!
// formElement.addEventListener('submit', (event) => {
// 	// Don’t actually submit (which would refresh the page):
// 	// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
// 	event.preventDefault()
// })

// // Run any time the form is modified:
// // https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
// formElement.addEventListener('input', () => {
// 	updateUrlParams()
// })



// I have commmented out Michael's pre-ready form code because it was a lot and I wanted to understand my form step-by-step, so I am starting below from scratch.

let tasks = [];

document.querySelector('#some-form').onsubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(document.querySelector('#some-form'));
   
    let taskName = formData.get('task-text'); 
    
    let taskTime = formData.get('minutes'); 
    
    let newListItem = document.createElement('li');

    newListItem.textContent = `Task: ${taskName} Minutes: ${taskTime}`

    document.querySelector('#task-list').append(newListItem)


// For the above logic, I understood the first few lines of code by simply following Eric's tutorial on json in forms, specifically 28:14-31:12
//https:www.loom.com/share/3f81aa35dde54e6fb28e7d301b76c396?t=1655

// Once Eric continued to move past this point and get into the 'keys' and 'values' part of 'FormData,' I began to get confused. That is when I started to reference Gemini for help. I began by asking it more about the FormData element, after which it helped me understand the different ways you can use FormData to show data. This began to make more sense to me than the keys stuff in the tutorial. More specifically, I understood that they 'key' is basically the name of the object, and the 'value' is all the different inputs that come under a single 'key'. For example, 'task name' is my key and 'shower' would be my value. 

// I then continued to chat with it by making up an example of a form that is not directly my project but has similar logic - sports and their difficulty levels. 

// In the middle there was some basic syntax I messed up because I was understanding the logic, but another challenge I face with JS is that I don't understand what order to write the lines, even if I am slowly understanding what the different words mean. I was mashing up the submit syntax with the task list syntax, and it helped me fix that. 

//A really big understanding it helped me come to, myself, whilst acting like my teacher, was the 'append' idea. I finally understood that to save the tasks on the empty div in my html, it has to 'add' an extra html element to the already entered inputs that the users are giving to the form. This is what causes them to then appear as individual new inputs in the previously empty div. 

// With this sort of back-and-forth, it was able to help me understand the different steps I have to take to collect data once it has been inputted.

// Link to this Gemini Conversation: https://gemini.google.com/share/0abdb9c1c3eb 

// Also, in between these steps, after I did it correctly, I still shortly ran into a typo which was causing a null error. I used Gemini to help trouble shoot that briefly. Link to this conversation: https://gemini.google.com/share/5bc6a2121bc4

 
    let taskObject = {
        task: taskName, 
        time: taskTime, 
    };

    tasks.push(taskObject)
    console.log(tasks)


}

// continued to follow Eric's tutorial for the above chunk of code - assigning a value to each element so that it can be printed. I think this is necessary for the next step, which will be integrating this into localStorage (I assume we cannot add stuff to localStorage without a key and a value because that is how things are organized in it.)