const MongoClient = require('mongodb').MongoClient;
const { v4: uuidv4 } = require('uuid');


async function addToDoItem(username,itemValue){
  const now = new Date();
  // Create a new MongoClient
  const client = await MongoClient.connect('mongodb+srv://mokdadali963:' + encodeURIComponent('j6yFG6wUgsKuzZIt') + '@fortesting.ceoodxl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db('toDoApp');
  const collection = db.collection('toDoLists');
  const query = { username: username};

  // Define the update operation to remove the item from the toDoItems array
  const update = { $push: { toDoItems: { value: itemValue, itemId: uuidv4(),date:now } } };

  collection.findOneAndUpdate(query, update, function(err, result) {
    client.close();
    if(err) return 0
    return 1
  });
}
module.exports = addToDoItem;
