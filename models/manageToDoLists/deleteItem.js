const MongoClient = require('mongodb').MongoClient;


async function deleteToDoItem(username,itemId){

  // Create a new MongoClient
  const client = await MongoClient.connect('mongodb+srv://mokdadali963:' + encodeURIComponent('j6yFG6wUgsKuzZIt') + '@fortesting.ceoodxl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db('toDoApp');
  const collection = db.collection('toDoLists');

  const query = { username: username};
  console.log('i',itemId)
  // Define the update operation to remove the item from the toDoItems array
  const update = { $pull: { toDoItems: { itemId:itemId } } };

  collection.findOneAndUpdate(query, update, function(err, result) {
    console.log('this is result',result)
  });
}

module.exports = deleteToDoItem;