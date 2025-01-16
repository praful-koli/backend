const express = require('express');
const app = express();
const port = 8080;
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'delta_app',
    password : "prafulkoli@2003"
});


// let  getRandomUser = () =>{
//     return [
//        faker.string.uuid(),
//        faker.internet.username(), // before version 9.1.0, use userName()
//        faker.internet.email(),
//        faker.internet.password(),    
//     ]
//   }








//  express app

app.get('/', (req, res)=> {
  let q = "  select count(*) from user";
  try {
       connection.query(q, (err, result) =>{
       if (err) throw err; 
       let data  = result[0] ["count(*)"];
       res.render('home',{data});
      });
    } catch (error) {
      console.log(error);
  }
     
})


app.get('/user', (req, res)=> {
    let q = "SELECT id, username, email FROM user ";

    try {
         connection.query(q, (err, result) => {
           if (err) throw err;
           let datas = result;
           res.render('user',{datas});
         })
    } catch (error) {
      console.log(error);
    }
});



app.get('/user/:id/edit', (req, res) => {
    let {id} = req.params;
    let q = `select * from user where id = '${id}'`;
    try {
         connection.query(q , (err, result) => {
         if (err) throw err;
         let user = result[0];
         res.render('edit',{user});
      });
    } catch (error) {
      
    }
});


app.patch('/user/:id' , (req, res) => {
  let {id} = req.params;
  let username = req.body.username;
  let password = req.body.password;
  let q1 = `SELECT password FROM user WHERE id='${id}' `;

   try {
      connection.query(q1 , (err, result) => {
      if (err) throw err;
      DBpassword = result[0]['password'];

      if (password == DBpassword) {
             let q2 = `UPDATE user SET username ='${username}' WHERE id='${id}' `;

        try {
               connection.query(q2 , (err, result) => {
               if (err) throw err;
               res.redirect('/user');
           });
           } catch (error) {

            console.log(error);   

          }
      } else {

         res.send("wrong password !");

      }
     
    });
   } catch (error) {
     console.log(error);
   }
  
});


app.listen(port, ()=> {
   console.log(`server is listening port ${port}`);
})






  // console.log(getRandomUser());

//  let q = "INSERT INTO user (id , username, email, password) value ?";
 
//  let data = [];
//  for (let i = 0; i <= 100; i++) {
//      data.push(getRandomUser());
//  }

// let users = [ [1, "user1", "user1@example.com", "password1"], [2, "user2", "user2@example.com", "password2"], [3, "user3", "user3@example.com", "password3"] ];
// try {
//   connection.query(q,[users]  , (err, result)=> {
//      if (err) {
//      console.log(err.message);
//      }
//      console.log(result);
//   })
// } catch (error) {
//     console.log(error);
// }
  



//  connection.end();