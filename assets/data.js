//Show the users list
tabla = document.getElementById('tbody');
container = document.getElementById('container');
userContainer = document.getElementById('user_container');
let jsonFile;

async function getData(){

    try{
        let response = await fetch('https://flaskbasicapi.herokuapp.com/users');
        jsonFile = await response.json();
    
        printData(jsonFile)
    }catch{
        var alertDiv = document.createElement('div');
        alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">We had a problem loading the users</div>';
        container.appendChild(alertDiv);
    }
    
}

function printData(data){

    for(var i=0; i<data.length;i++){

        var listItem = document.createElement('tr');
        listItem.innerHTML ='<td>'+data[i].name+'</td><td>'+data[i].password+'</td><td>'+data[i].email+'</td><td><button class="btn btn-secondary me-2" id="edit-'+i+'" onclick="editUser('+i+')"><i class="fas fa-marker"></i></button><button class="btn btn-danger" id="delete-'+i+'" onclick="deleteUser('+i+')"><i class="fas fa-trash"></i></button></td>';

        tabla.appendChild(listItem);
    }

}

//Add a new user
function readData(){
    var name = document.getElementById('inputName').value;
    var email = document.getElementById('inputEmail').value;
    var pass = document.getElementById('inputPassword').value;

    let user = {
        'email': email,
        'name': name,
        'password': pass
    };

    console.log(user)
    postData(user);
}

var created=0;
var alertDiv = document.createElement('div');
async function postData(user){
    
    var message = '';

    try{
        let response = await fetch('https://flaskbasicapi.herokuapp.com/users',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            
        });
        let result = await response.json();
        console.log(result)

        message = '<div class="alert alert-success" role="alert">User-created successfully, if you finish the user\'s creation you can see the <a href="/index.html" class="nav-link">Users list</a> </div>';
        printAlert(1,message);
        //alertDiv.innerHTML = '<div class="alert alert-success" role="alert">User-created successfully, if you finish the user\'s creation you can see the <a href="/index.html" class="nav-link">Users list</a> </div>';


    }catch{
        
        message = '<div class="alert alert-danger" role="alert">We had a problem with the user creation</div>';
        printAlert(2,message);
        //alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">We had a problem with the user creation</div>';
        
    }
    
}

function printAlert(n,message){
    if(created!=n){
        alertDiv.innerHTML = message;
        userContainer.appendChild(alertDiv);
        created=n;
    }
}

// Edit users
function editUser(n){
    console.log(jsonFile[n].name);
}

// Delelte users
async function deleteUser(n){

    if(confirm('Are you sure about deleting this user?')){
        try{
            let response = await fetch('https://flaskbasicapi.herokuapp.com/user/'+jsonFile[n]._id,
            {
                method: 'DELETE',
            });
            alert('User deleted successful');
            location.reload();
        }catch{
            var alertDiv = document.createElement('div');
            alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">We had a problem deleting the users</div>';
            container.appendChild(alertDiv);
        }
    }

    
}