fetch('assets/data.json')
    .then(response => response.json())
    .then(data => {
        renderItems(data)
    }) 