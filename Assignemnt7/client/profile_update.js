function getData()
{ 
    var mytable=document.getElementById("mytable");
    mytable.innerHTML=""
    var id=sessionStorage.getItem("id");
    var data={
        id:id
    }
    console.lo
    var helper= new XMLHttpRequest();
    helper.onreadystatechange =()=>
    { 
        if(helper.readyState==4 && helper.status==200)
        {
            var rs= JSON.parse(helper.responseText);
        
            var row=`<tr>
            <th>
                First Name:
            </th>
            <td>
            ${rs[0].firstName}
            </td>

        </tr>
        <tr>
            <th>
                Last Name:
            </th>
            <td>
            ${rs[0].lastName}
            </td>
            
        </tr>
        <tr>
            <th>
                Email:
            </th>
            <td>
            ${rs[0].email}
            </td>
            
        </tr>
        <tr>
            <th>
                Password:
            </th>
            <td>
            ${rs[0].password}
            </td>
            
        </tr>
        <tr>
            <th>
                Mobile:
            </th>
            <td>
            ${rs[0].phoneNumber}
            </td>
            
        </tr>
        <tr>
           
            <td colspan="2">
                <button onclick="edit()" class="btn btn-success" style="margin-left:30px;margin-right: 30px;">Edit</button>
            </td>
            
        </tr>`;
        mytable.innerHTML=mytable.innerHTML+row;
        }
    }
    
    helper.open("POST","http://127.0.0.1:9999/detail")
    helper.setRequestHeader("Content-Type","application/json")
    helper.send(JSON.stringify(data));
}

function edit()
{ 
    var fname=document.getElementById("fname")
var lname=document.getElementById("lname")
var email=document.getElementById("email")
var password=document.getElementById("password")
var mobile=document.getElementById("mobile")
var id1=document.getElementById("id1");

var id=sessionStorage.getItem("id");

var data={
    id:id
}
var helper= new XMLHttpRequest();
helper.onreadystatechange =()=>
{ 
    if(helper.readyState==4 && helper.status==200)
    { 
        var rs= JSON.parse(helper.responseText);
        fname.value=rs[0].firstName;
        lname.value=rs[0].lastName;
        email.value=rs[0].email;
        password.value=rs[0].password;
        mobile.value=rs[0].phoneNumber;
        id1.value=rs[0].id;      
    }
}

helper.open("POST","http://127.0.0.1:9999/detail")
helper.setRequestHeader("Content-Type","application/json")
helper.send(JSON.stringify(data));


}
function update()
{
var fname=document.getElementById("fname")
var lname=document.getElementById("lname")
var email=document.getElementById("email")
var password=document.getElementById("password")
var mobile=document.getElementById("mobile")
var id1=document.getElementById("id1");

var f=fname.value;
var l=lname.value;
var e=email.value;
var p=password.value;
var m=mobile.value;

var data={
    f:f,
    l:l,
    e:e,
    p:p,
    m:m
}

var id=parseInt(sessionStorage.getItem("id"));

var helper = new XMLHttpRequest();
helper.onreadystatechange =()=>
{
if(helper.readyState==4 && helper.status==200)
{
    var rs=JSON.parse(helper.responseText);
    if(rs.affectedRows>0)
    {
        alert("updated successfully")
        getData();
    }
    else
    {
        alert("Something went wrong!!!!!")
    }
}
}
helper.open("PUT",`http://127.0.0.1:9999/update/${id}`);
helper.setRequestHeader("Content-Type","application/json");
helper.send(JSON.stringify(data));
}
getData();
