
const express = require('express');
const app = express();
const mysql = require('mysql2');

const jwt = require('jsonwebtoken');
const jwtSecret = 'hihellohowru';


app.use(express.json());


const connectionString = {
    host : "localhost",
    port : "3306",
    database : "election_db",
    user : "kd4_vicky_83515",
    password : "9850"
}


app.post('/voter/signup',(req,res)=>{
   
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const changedPassword = btoa(password);
    console.log(changedPassword);
    

    let connection = mysql.createConnection(connectionString);
    connection.connect();


    let queryText = `insert into voter (name,email,password) values ('${name}','${email}','${changedPassword}')`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.write(JSON.stringify(result));
            connection.end();
            res.end();
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();
        }
    })


});

app.post('/voter/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const changedPassword = btoa(password);

    let connection = mysql.createConnection(connectionString)
    connection.connect();
    console.log(changedPassword);

    let queryText = `select id from voter where email = '${email}' and password = '${changedPassword}'`;

    connection.query(queryText,(err,result)=>{
        if(err==null){
            
            const id = result[0].id;
            const token = jwt.sign({changedPassword,id}
                ,jwtSecret);

            res.write(JSON.stringify(result));
            res.write(JSON.stringify(token));
            connection.end();
            res.end();
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();
        }
    })


   
});

app.use((req,res,next)=>{
    const token = req.headers.authorization;

    if(token != undefined){
        let dataInsideToken = jwt.verify(token,jwtSecret);
        console.log(dataInsideToken);
        next();
    }
    else{
        res.write('token is not prestent')
    }
});


app.get('/candidate/list',(req,res)=>{
    
    let connection = mysql.createConnection(connectionString);
    connection.connect();

    let queryText = `select * from candidate`;

    connection.query(queryText,(err,result)=>{
        if(!err){
            res.json(result);
        }
        else{
            res.write(JSON.stringify(err));
            connection.end();
            res.end();

        }
    })


});

app.post('/vote', (req, res) => {
    const voterId  = req.body.voterId;
    const candidateId  = req.body.candidateId;
    
    connection.query('SELECT * FROM votes WHERE voter_id = ?', [voterId], (err, results) => {
      if (err) throw err;
      
      if (results.length > 0) {
        res.status(403).json({ status: 'error', message: ' already voted' });
      } else {

        connection.query('INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)', [voterId, candidateId], (err, results) => {
          if (err) throw err;
          res.json({ status: 'success', message: 'you have voted successfully' });
        });
      }
    });
  });



app.listen(3000, () => {
    console.log("Server Started...3000");
});





















