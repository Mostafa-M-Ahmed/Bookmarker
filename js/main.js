var websiteNameInput = document.getElementById('inputName');
var websiteURLInput = document.getElementById('inputURL');
var btn = document.getElementById('btn');
var tableRow = document.getElementById('tableRow');
var websiteLists = [];
var alertWindow = document.getElementById('exampleModal');
var modalButton = document.getElementById('modalButton');

if (localStorage.getItem('websites') != null)
    var websiteLists = JSON.parse(localStorage.getItem('websites'))

display(websiteLists)
btn.onclick = function (e) {
    e.preventDefault();
    submit();
}

function submit() {
    if (websiteNameRegex() && websiteURLRegex()) {
        var website = {
            websiteName: capitalize(websiteNameInput.value),
            websiteURL: websiteURLInput.value
        }
        websiteLists.push(website);
        localStorage.setItem('websites', JSON.stringify(websiteLists));
        display(websiteLists);
        clearForm();
    }
    else
        notMatch();
}

function display(list) {
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${list[i].websiteName}</td>
            <td><a href="${list[i].websiteURL}" target="_blank"><button class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
            <td><button class="btn btn-danger" onclick="deleteFun(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                </tr>`
    }
    tableRow.innerHTML = box;
}

function clearForm() {
    websiteNameInput.value = '';
    websiteURLInput.value = '';
}

function deleteFun(index) {
    websiteLists.splice(index, 1)
    localStorage.setItem('websites', JSON.stringify(websiteLists))
    display(websiteLists)
}

function search(term) {
    var searchedArr = [];
    for (var i = 0; i < websiteLists.length; i++) {
        if (websiteLists[i].websiteName.toLowerCase().includes(term.toLowerCase()) == true) {
            searchedArr.push(websiteLists[i])
        }
    }
    display(searchedArr)
}

function websiteNameRegex() {
    var Regex = /^\w{3,}$/
    return Regex.test(websiteNameInput.value)
}
function websiteURLRegex() {
    var Regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    return Regex.test(websiteURLInput.value)
}
function notMatch() {
    if (!websiteNameRegex() || !websiteURLRegex())
        modalButton.click()
}

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
  }