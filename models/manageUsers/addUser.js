const MongoClient = require('mongodb').MongoClient;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function addUser(username,password){
  // Create a new MongoClient
  const client = await MongoClient.connect('mongodb+srv://mokdadali963:' + encodeURIComponent('j6yFG6wUgsKuzZIt') + '@fortesting.ceoodxl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db('toDoApp');
  const collection = db.collection('toDoLists');

  const hashedPassword = await bcrypt.hash(password, 10);

  const document = { 
    username, 
    password:hashedPassword,
    toDoItems: []
  };

  try {
    
  const result = await collection.insertOne(document);
  client.close();
  return 1
  }
  catch(e) {
    console.log('error adding user')
    return 0
  }
}
module.exports = addUser;
