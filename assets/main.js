let renderItems = (data) => {
    let containerEl = document.querySelector('#time-log')
    
    data.forEach(item => {
        let timeTaken = item['Time taken']
        let className = ''

        if (timeTaken < 15) {
            timeTaken = 'small'
            className = 'small-task'
        }

        else if (timeTaken >= 15 && timeTaken <= 30) {
            timeTaken = 'medium'
            className = 'medium-task'
        }

        else if (timeTaken > 30) {
            timeTaken = 'large'
            className = 'large-task'
        } 
        
        else{
            timeTaken = `${timeTaken} minutes`
        }

        let itemHtml = 
        `  
            <li class="${className}">
                <p>${item['Task']}</p>
                <p>${item['Time taken']}</p>
            </li>
        `

        containerEl.insertAdjacentHTML('beforeend', itemHtml)
    })
}

fetch('assets/data.json')
    .then(response => response.json())
    .then(data => {
        renderItems(data)
    }) 


// In all of this, I used Gemini's help once when I was facing a syntax error in writing my if else function. You can also check my commits to see that I came up with the function myself, the assistance is purely to understand why my syntax is wrong. It told me a bunch of other extra changes too but I only changed what was necessary:

// https://gemini.google.com/share/95ff8fab34b0 
