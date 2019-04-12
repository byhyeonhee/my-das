const clearBtn = d3.select('#clearBtn');
const getUserBtn = d3.select('#getUserBtn');
const getUserIdBtn = d3.select('#getUserIdBtn');
const getUserCountBtn = d3.select('#getUserCountBtn');
const getUserFieldBtn = d3.select('#getUserFieldBtn');
const getUserQuery = d3.select('#getUserQuery');
const getTopUserBtn = d3.select('#getTopUserBtn');
const getInvalidUserBtn = d3.select('#getInvalidUserBtn');
const POSTUserBtn = d3.select('#POSTUserBtn');
const DeleteUserBtn = d3.select('#DeleteUserBtn');
const PatchUserBtn = d3.select('#PatchUserBtn');

const target = d3.select('#resultDiv');

function printResult(db2Result, node) {
    const ul = node.append('ul').style('font-size','10px');
    console.log(db2Result)
    db2Result.map(result => {
        ul.append('li').text(JSON.stringify(result));
    })
}

clearBtn.on('click', () => target.selectAll('*').remove() )

getUserBtn.on('click', () => {
    const options = {
        method : 'GET'
    }
    fetch('/api/v1.0/users', options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})

getUserIdBtn.on('click', () => {
    const userID = d3.select('#userid').property('value')
    const options = {
        method : 'GET'
    }

    fetch(`/api/v1.0/users/${userID}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})


getUserCountBtn.on('click', () => {
    const count = d3.select('#count').property('value')
    const options = {
        method : 'GET'
    }

    fetch(`/api/v1.0/users?count=${count}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})

getUserFieldBtn.on('click', () => {
    const fields = d3.select('#fields').property('value')
    const options = {
        method : 'GET'
    }
    fetch(`/api/v1.0/users?fields=${fields}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})

getUserQuery.on('click', () => {
    const query = d3.select('#query').property('value')
    const options = {
        method : 'GET'
    }

    fetch(`/api/v1.0/users?q=${query}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})

getTopUserBtn.on('click', () => {
    const options = {
        method : 'GET'
    }

    fetch(`/api/v1.0/users/view/topUser`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
})

getInvalidUserBtn.on('click', () => {
    const options = {
        method : 'GET'
    }

    fetch(`/api/v1.0/users/view/invalidUser`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })    
})

POSTUserBtn.on('click', () => {
    const body = d3.select('#postBody').property('value');
    console.log(typeof(body));
    const options = {
        method : 'POST',  
        headers : {'Content-Type': 'application/json'},
        body : body
    }

    fetch(`/api/v1.0/users`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })       
})

DeleteUserBtn.on('click', () => {
    const userID = d3.select('#deleteID').property('value')
    const options = {
        method : 'DELETE'
    }

    fetch(`/api/v1.0/users/${userID}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })    
})

PatchUserBtn.on('click', () => {
    const userID = d3.select('#patchID').property('value')
    const body = d3.select('#patchBody').property('value');
    const options = {
        method : 'PATCH',  
        headers : {'Content-Type': 'application/json'},
        body : body
    }

    fetch(`/api/v1.0/users/${userID}`, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })     
})