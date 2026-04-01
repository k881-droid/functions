let renderItems = (data) => {
    let containerEl = document.querySelector('#time-log')
    data.forEach(item => {
        let itemHtml = 
        `  
            <li>
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