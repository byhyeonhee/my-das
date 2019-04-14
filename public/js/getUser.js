const clearBtn = d3.select('#clearBtn');
const getUserBtn = d3.select('#getUserBtn');
const getUserIdBtn = d3.select('#getUserIdBtn');
const getUserLimitBtn = d3.select('#getUserLimitBtn');
const getUserFieldBtn = d3.select('#getUserFieldBtn');
const getUserQuery = d3.select('#getUserQuery');
const getTopUserBtn = d3.select('#getTopUserBtn');
const getInvalidUserBtn = d3.select('#getInvalidUserBtn');
const POSTUserBtn = d3.select('#POSTUserBtn');
const DeleteUserBtn = d3.select('#DeleteUserBtn');
const PatchUserBtn = d3.select('#PatchUserBtn');

const target = d3.select('#resultDiv');

function printResult(results, node) {
    const ul = node.append('ul').style('font-size','10px');
    console.log(results)
    if(results.success) results.body.map(result => ul.append('li').text(JSON.stringify(result)));
    if(!results.success) {
        const err = results.err
        const result = (typeof(err) === 'object') ? JSON.stringify(err) : err;
        ul.append('li').text(result);
    }
}

function request(url, options) {
    fetch(url, options)
    .then(response => {
        return response.json()
    })
    .then(body => {
        target.selectAll('*').remove();
        printResult(body, target)
    })
}

clearBtn.on('click', () => target.selectAll('*').remove() )

getUserBtn.on('click', () => {
    const options = { method : 'GET' }
    request('/api/v1.0/users', options)
})

getUserIdBtn.on('click', () => {
    const userID = d3.select('#userid').property('value')
    const options = { method : 'GET' }
    request(`/api/v1.0/users/${userID}`, options)
})


getUserLimitBtn.on('click', () => {
    const limit = d3.select('#limit').property('value')
    const options = { method : 'GET' }
    request(`/api/v1.0/users?limit=${limit}`, options)
})

getUserFieldBtn.on('click', () => {
    const fields = d3.select('#fields').property('value')
    const options = { method : 'GET' }
    request(`/api/v1.0/users?fields=${fields}`, options)
})

getUserQuery.on('click', () => {
    const query = d3.select('#query').property('value')
    const options = { method : 'GET' }
    request(`/api/v1.0/users?q=${query}`, options)
})

getTopUserBtn.on('click', () => {
    const options = { method : 'GET' }
    request(`/api/v1.0/users/view/topUser`, options)
})

getInvalidUserBtn.on('click', () => {
    const options = { method : 'GET' }
    request(`/api/v1.0/users/view/invalidUser`, options) 
})

POSTUserBtn.on('click', () => {
    const body = d3.select('#postBody').property('value');
    const options = {
        method : 'POST',  
        headers : {'Content-Type': 'application/json'},
        body : body
    }

    request(`/api/v1.0/users`, options);    
})

DeleteUserBtn.on('click', () => {
    const userID = d3.select('#deleteID').property('value')
    const options = { method : 'DELETE' }

    request(`/api/v1.0/users/${userID}`, options)
})

PatchUserBtn.on('click', () => {
    const userID = d3.select('#patchID').property('value')
    const body = d3.select('#patchBody').property('value');
    const options = {
        method : 'PATCH',  
        headers : {'Content-Type': 'application/json'},
        body : body
    }

    request(`/api/v1.0/users/${userID}`, options);  
})