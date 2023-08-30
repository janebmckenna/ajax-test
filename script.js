// var xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function(){
//     if (this.readyState == 4 && this.status == 200){
//         document.getElementById('data').innerHTML = this.responseText;
//     }
// };

// xhr.open('GET', 'https://ci-swapi.herokuapp.com/api/');

// xhr.send();


// const baseURL = "https://ci-swapi.herokuapp.com/api/"; Was making the next buutton fail because it was appending the url twice

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

function getTableHeaders(obj){
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<th> ${key}</th>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev){
    if (next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
        <button onclick="writeToDocument('${next}')">Next</button>`;
    } if (next && !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } if (!next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`
    }
}

function writeToDocument(url) {
    var tableRows = [];
    var el = document.getElementById('data');
    el.innerHTML = '';
    getData(url, function(data) {
        var pagination;
        if (data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous)
        }
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item){
            var dataRow = [];

            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        })
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>
        ${pagination}`.replace(/,/g, '');
        // console.dir(data); // prints the details to the console
    });
}
