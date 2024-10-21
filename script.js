const URL = 'https://docs.google.com/spreadsheets/u/0/d/1-M-8mIOl56CaxEcJ2terHrJzMJ1JWVo8IUARQn_ZsG0/export?format=tsv&id=1-M-8mIOl56CaxEcJ2terHrJzMJ1JWVo8IUARQn_ZsG0&gid=0'
const SEP_LINE = '\r\n'
const SEP_CELL = '\t'
const DOM_TABLE = document.querySelector('.students')

function loadData() {
    fetch(URL)
        .then(response => response.text())
        .then(body => parseData(body))
        .then(data => render(data));
}

function parseData(body) {
    const table = body
        .split(SEP_LINE)
        .map(element => element.split(SEP_CELL));
    const headers = table.shift();

    return {
        headers: headers,
        students: table.map(element => {
                const student = {};
                headers.forEach((header, i) => student[header] = element[i])
                return student
            }
        )
    };
}

function render(data) {
    DOM_TABLE.innerHTML = `
    ${header(data.headers)}
    <tbody>
        ${body(data.students)}
    </tbody>`;
}

function header(headers) {
    return `
    <thead>
    <tr>
        <th scope="col">${headers[0]}</th>
        <th scope="col">${headers[1]}</th>
        <th scope="col">${headers[2]}</th>
        <th scope="col">${headers[3]}</th>
    </tr>
    </thead>`;
}

function body(students) {
    return `
    <tbody>
        ${students.map(it => row(it)).join("")}
    </tbody>`;
}

function row(student) {
    return `
    <tr>
        <th scope="row">${student.group}</th>
        <td>${student.firstName}</td>
        <td>${student.secondName}</td>
        <td>${student.birthday}</td>
    </tr>`;
}

loadData();
