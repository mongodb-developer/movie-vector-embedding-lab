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

main().catch(console.dir);
