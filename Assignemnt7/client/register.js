function register()
{
var fname=document.getElementById("fname")
var lname=document.getElementById("lname")
var email=document.getElementById("email")
var password=document.getElementById("password")
var mobile=document.getElementById("mobile")

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
console.log(data)
    var helper= new XMLHttpRequest();
    helper.onreadystatechange=()=>
    {
        if(helper.readyState==4 && helper.status==200)
        {
            var rs= JSON.parse(helper.responseText);
            if(rs.affectedRows>0)
            {
                alert("Registered Successfully")
                window.location.href="login.html"
            }
            else
            {
                alert("Registration Failed!!!!")
            }
        }
    }
    helper.open("POST","http://127.0.0.1:9999/register");
    helper.setRequestHeader("Content-Type","application/json")
    helper.send(JSON.stringify(data));

}