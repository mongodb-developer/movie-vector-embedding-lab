const { MongoClient } = require("mongodb");
const axios = require("axios");

require("dotenv").config();
const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri);
const hf_token = process.env.HF_ACCESS_TOKEN;

const embeddingUrl =
  "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";

async function main() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged deployment. You successfully connected to your MongoDB Atlas cluster."
    );
  } finally {
    console.log("Closing connection.");
    await client.close();
  }
}

// After a successful connection, comment out to execute generateEmbeddings function
main().catch(console.dir);

// Step 1. Create Embeddings
// paste generateEmbeddings()

//  generateEmbeddings("MongoDB is AWESOME!")

// Step 2. Save Embeddings to Atlas
// paste saveEmbeddings()

//  saveEmbeddings();

// Step 3. Index Embeddings in Atlas
// create vector_index in Atlas

// Step 4. Query Embeddings
// paste queryEmbeddings()


// queryEmbeddings("zombies attacking people");
