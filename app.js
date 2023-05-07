const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const getAllToDoItems = require('./models/manageToDoLists/getToDoItems') 
const deleteToDoItem = require('./models/manageToDoLists/deleteItem') 
const addToDoItem = require('./models/manageToDoLists/addItem') 
const addUser = require('./models/manageUsers/addUser') 
const verifyUser = require('./models/authentication/verifyUser') 
const {verifyToken,createToken} = require('./models/authentication/jwtAuthentication') 
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function(req, res) {

  if(await verifyToken(req)){
    res.redirect('/list')
  }
  else{
  res.render("/")}


});


app.get("/list", async function(req, res) {

  username = await verifyToken(req);
  if (!username){ res.redirect('/')}
  else {
  toDoItems = await getAllToDoItems(username);

  res.render("list", {listTitle: "Today", newListItems: toDoItems});}


});

app.get("/register", async function(req, res) {

  username = 'ali'

  res.render("register");


});

// forms

app.post("/add", async function(req, res){

  const itemName = req.body.newItem;
  username = await verifyToken(req);
  console.log(itemName,username)
  await addToDoItem(username,itemName);
  res.redirect('/list')

});

app.post("/delete", async function(req, res){
  const checkedItemId = req.body.checkbox;
  username = await verifyToken(req);
  updateList = await deleteToDoItem(username,checkedItemId)
  res.redirect('/list')
});

app.post("/registration", async function(req, res){
  const email = req.body.emailAddress
  const password = req.body.password
  const passwordConfirmation = req.body.passwordConfirmation

  if (!email || !password || !passwordConfirmation) {
    res.redirect('/register')
  }

  if (password != passwordConfirmation) {
    res.redirect('/register')
  }
  result = await addUser(email,password);
  res.redirect('/');
});

app.post("/login",async function(req,res){
  const email = req.body.email
  const password = req.body.password

  if(await verifyUser(email,password)){

    //create token
    await createToken(email,res);
    res.redirect('/list')
  }
  else{
    res.redirect('/')
  }
  
  
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
