var email=document.getElementById("email");
var password=document.getElementById("password");
var sel=document.getElementById("sel");
function login()
{
    var e=email.value;
    var p= password.value;
    var s=sel.value;
    
    var data={
        email:e,
        password:p
    }

    var helper = new XMLHttpRequest();
    helper.onreadystatechange= ()=>{
        if(helper.readyState==4&& helper.status==200)
        {
            var rs= JSON.parse(helper.responseText);
            
            if(s=="user")
            {
                if(rs.status=="success")
                {
                alert("logged in successfully");
                window.location.href="user_dash.html";
                sessionStorage.setItem("id",`${rs.data[0].id}`)
                
                }
                else
                { 
                alert("Please login with correct credentials");
                }
            
            }
            
            else{
                if(rs.status=="success")
                {
                alert("logged in successfully");
                window.location.href="admin_dash.html";
                sessionStorage.setItem("id",`${rs.data[0].id}`)
                }
                else
                { 
                alert("Please login with correct credentials");
                }
               
            }
            
        }
    }
    helper.open("POST","http://127.0.0.1:9999/login");
    helper.setRequestHeader("Content-Type","application/json")
    helper.send(JSON.stringify(data));
}
