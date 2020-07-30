const express = require("express");
const app = express();
const request = require("request");
const pool = require("./dbPool.js");
const bcrypt = require('bcrypt');
const session = require('express-session');
const mysql = require('mysql');


app.set("view engine", "ejs");
app.use(express.static("public"));

//add sessions
app.use(session({
 secret: "top secret!",
 resave: true,
 saveUninitialized: true
}));

//***View routes*** 
app.get("/", function(req, res){
 res.render("index.ejs");
});
 
app.get("/cart", function(req, res){
 res.render("cart.ejs");
});

app.get("/signup", function(req, res){
 res.render("signup.ejs");
});

app.get("/admin", function(req, res){
 res.render("admin.ejs");
});

app.get("/reports", function(req, res){
 res.render("reports.ejs");
});

//Login route
app.get("/login", function(req, res){
 res.render("login.ejs");
});
//POST route to get password data entered on login
app.use(express.urlencoded({extended: true})); //add ability to parse POST parameters

app.post("/login", function(req, res){
 let username = req.body.username;
 let password = req.body.password; 
 
 console.log("Username: " + username);
 console.log("Password: " + password);
 
 res.send("This is the root route using POST!");
});



//***API Routes*** 

app.get("/api/populateAlbumsArray", function(req, res){
 
 let sql = "SELECT * FROM albums";
 
 pool.query(sql, function(err, rows, fields){
  if (err) throw err;
  console.log(rows);
  res.send(rows);
  
 });

});//app.get(populateAlbumArray);



 //start server
 app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Express server is running...");
 });
