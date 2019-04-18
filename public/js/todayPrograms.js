const clearBtn = d3.select('#clearBtn');
const getTodayProgramsBtn = d3.select('#getTodayProgramsBtn');
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

getTodayProgramsBtn.on('click', () => {
    const today = d3.select('#today').property('value')
    const options = { method : 'GET' }
    request(`/api/v1.0/todayPrograms/today?q=${today}`, options)
});