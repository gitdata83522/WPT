var express= require('express');
var mysql=require('mysql');

var app= express();

var connection={
    host:"localhost",
    port:3306,
    user:"root",
    password:"hello",
    database:"airbnb_db"
}

app.use(express.json());
app.use((request,response,next)=>
{
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");

    response.setHeader("Access-Control-Allow-Methods","*");
    next();
});
app.post("/login",(request,response)=>{
    var email=request.body.email;
    var password=request.body.password;

    var conn=mysql.createConnection(connection);
    conn.connect();
    
    var sql=`select email,password,id from user where email='${email}' and password='${password}'`;
    conn.query(sql,(err,result)=>
    {
        if(err==null)

        {  
            if(result.length!=0)
            {
                var j={
                    status:"success",
                    data:result
                }
                    var rs= JSON.stringify(j);
                    response.write(rs);
                    conn.end();
                    response.end();
            }
            else
            {
                var j={
                    status:"failure"
                    
                }
                var rs= JSON.stringify(j);
                response.write(rs);
                console.log(err)
                conn.end();
                response.end();
            }
        }
        else{
            console.log("something went wrong!!!!")
        }
    });
});
app.post("/register",(request,response)=>
{
    var fname=request.body.f;
    console.log(fname)
    var lname=request.body.l;
    var email=request.body.e;
    var password=request.body.p;
    var mob=request.body.m;

    var sql=`insert into user (firstName,lastName,email,password,phoneNumber,createdTimestamp) values('${fname}','${lname}','${email}','${password}','${mob}',now())`;
    var conn= mysql.createConnection(connection);
    conn.connect();
    conn.query(sql,(err,result)=>
    {
        if(err==null)
        {
            var rs=JSON.stringify(result)
            response.write(rs);
            conn.end();
            response.end();
        }
        else{
            console.log("something went wrong!!!!")
            console.log(err);
        }
    })
});
app.post("/detail",(request,response)=>
{
    var conn=mysql.createConnection(connection);
    var id=request.body.id;
    conn.connect();
    var sql=`select * from user where id=${id}`;
    conn.query(sql,(err,result)=>
    {
        if(err==null)
        {
            var rs=JSON.stringify(result);
            response.write(rs);
            conn.end();
            response.end();
        }
        else{
            console.log(err);
            console.log("something went wrong!!!!!")
        }
    })
});
app.put("/update/:id",(request,response)=>
{
    var conn= mysql.createConnection(connection);
    conn.connect();
    var fname=request.body.f;
    var lname=request.body.l;
    var email=request.body.e;
    var password=request.body.p;
    var mob=request.body.m;
    var id=request.params.id;
    console.log(fname);
    var sql=`update user set firstName='${fname}',lastName='${lname}',email='${email}',password='${password}',phoneNumber='${mob}' where id=${id}`;
    response.setHeader("Content-Type","application/json");
    conn.query(sql,(err,result)=>
    {
        if(err==null)
        {   console.log(result)
            var rs=JSON.stringify(result);
            response.write(rs);
            conn.end();
            response.end();
        }
        else{
            console.log("something went wrong!!!!")
            console.log(err);
        }
    })
})

app.listen(9999,()=>{
    console.log("Server Started!!!!!")
})