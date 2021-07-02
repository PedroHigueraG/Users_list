//Show the users list
tabla = document.getElementById('tbody');
container = document.getElementById('container');
userContainer = document.getElementById('user_container');

async function getData(){

    try{
        let response = await fetch('https://flaskbasicapi.herokuapp.com/users');
        let jsonFile = await response.json();
    
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
        listItem.innerHTML ='<td>'+data[i].name+'</td><td>'+data[i].password+'</td><td>'+data[i].email+'</td>';

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

async function postData(user){
    var alertDiv = document.createElement('div');

    try{
        let response = await fetch('https://flaskbasicapi.herokuapp.com/user',{
            method :'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            
        });
        let result = await response.json();
        console.log(result)

        alertDiv.innerHTML = '<div class="alert alert-success" role="alert">User created succesfully</div>';


    }catch{

        alertDiv.innerHTML = '<div class="alert alert-danger" role="alert">We had a problem with the user creation</div>';
        
    }
    userContainer.appendChild(alertDiv);
}