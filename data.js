tabla = document.getElementById('tbody');
container = document.getElementById('container');

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