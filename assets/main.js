let renderItems = (data) => {
    let containerEl = document.querySelector('#time-log')
    
    data.forEach(item => {
        let timeTaken = item['Time taken']
        let className = ''

        if (timeTaken < 15) {
            timeTaken = 'small'
            className = 'small-task'
        } else{
            timeTaken = `${timeTaken} minutes`
        }

        // if (30 < timeTaken > 15) {
        //     timeTaken = 'medium'
        //     className = 'medium-task'
        // } else{
        //     timeTaken = `${timeTaken} minutes`
        // }

        //  if (timeTaken > 30) {
        //     timeTaken = 'medium'
        //     className = 'medium-task'
        // } else{
        //     timeTaken = `${timeTaken} minutes`
        // }


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