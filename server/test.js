const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://nandumodi252:qZvLcmXeCOpPVi14@cluster0.1qt6erv.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected Successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();