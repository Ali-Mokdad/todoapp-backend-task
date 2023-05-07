const MongoClient = require('mongodb').MongoClient;


async function getUser(username){

  // Create a new MongoClient
  const client = await MongoClient.connect('mongodb+srv://mokdadali963:' + encodeURIComponent('j6yFG6wUgsKuzZIt') + '@fortesting.ceoodxl.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = client.db('toDoApp');
  const collection = db.collection('toDoLists');

  // Find all documents in the collection
  const result = await collection.findOne({ username: username  });
  
    // Close the database connection
  client.close();
  if (result)
    return result.password
  return 0
}

module.exports = getUser;