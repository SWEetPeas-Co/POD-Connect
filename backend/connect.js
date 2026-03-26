const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({path: './.env'});
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database;

module.exports = {
  connectToServer: async () => {
    await client.connect();
    database = client.db("PODConnectData");
  }, 
  getDb: () => {
    return database;
  }
}