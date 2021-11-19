(function initStorage(){
    if(!localStorage.getItem('users-data')){
        localStorage.setItem('users-data', '[]')
    }
}());

function setUserToStorage(users){
    localStorage.setItem('users-data', JSON.stringify(users))
}

function getUsersFromStorage(){
    let users = JSON.parse(localStorage.getItem('users-data'));
    return users
}

function render(){
    let users = getUsersFromStorage()
    $('table').html(`<tr>
                        <th>ФИО</th>
                        <th>Номер</th>
                        <th>Week KPI</th>
                        <th>Month KPI</th>
                    </tr>`)
    users.forEach((item, index) => {
        let newUser = `<tr id="${index}">
                            <td><a class="modal-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${item.name}</a></td>
                            <td>${item.number}</td>
                            <td>${item.week}</td>
                            <td class="photo_td">${item.month}</td>
                            <td><button class="btn btn-info">Изменить</button>
                            <button class="btn btn-danger">Удалить</button></td>
                        </tr>`
        $('table').append(newUser)
    })
}
render()

// get data from input
function getData(){
    let userData = {
        name: $('#name-inp').val(),
        number: $('#email-inp').val(),
        week: $('#age-inp').val(),
        month: $('#photo-inp').val()
    }
    $('#name-inp').val('')
    $('#email-inp').val('')
    $('#age-inp').val('')
    $('#photo-inp').val('')
    return userData
}

// add users server
function createUser (userData){
    fetch('http://localhost:8000/student', {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }
    })
}

// add user
$('.add-user__btn').on('click', (e) => {
    e.preventDefault()
    let data = {...getData()}
    let users = getUsersFromStorage()
    users.push(data)
    setUserToStorage(users)
    render()
})

// delete user
$('body').on('click', '.btn-danger', (e) => {
    let users = getUsersFromStorage()
    let parentId = e.target.parentNode.parentNode.id
    users.splice(parentId, 1)
    setUserToStorage(users)
    render()
})

// get edit data to input
$('body').on('click', '.btn-info', (e) => {
    let users = getUsersFromStorage()
    let parentId = e.target.parentNode.parentNode.id
    let currElem = users[parentId]
    $('#name-inp').val(`${currElem.name}`)
    $('#email-inp').val(`${currElem.number}`)
    $('#age-inp').val(`${currElem.week}`)
    $('#photo-inp').val(`${currElem.month}`)
    $('.edit-user__btn').attr('id', parentId)
})

// edit user
$('.edit-user__btn').on('click', (e) => {
    e.preventDefault()
    if(e.target.id === '') return
    let users = getUsersFromStorage()
    let editElem = users[e.target.id]
    editElem = {...getData()}
    users.splice(e.target.id, 1, editElem)
    setUserToStorage(users)
    $('.edit-user__btn').attr('id', '')
    render()
})

// modal
$('body').on('click', '.modal-link', (e) => {
    let users = getUsersFromStorage()
    let currElem = users[e.target.parentNode.parentNode.id]
    $('.modal-title').text(`${currElem.name}`)
    // $('.modal-img').attr('src', `${currElem.photoUrl}`)
    $('.modal-email').text(`${currElem.name} ${currElem.number} ${currElem.week} ${currElem.month}`)
})





