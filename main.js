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
// main().catch(console.dir);

// paste generateEmbeddings function
async function generateEmbeddings(text) {
  const data = { inputs: text };
  try {
    const response = await axios({
      url: embeddingUrl,
      method: "POST",
      headers: {
        Authorization: `Bearer ${hf_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: data,
    });
    if (response.status !== 200) {
      throw new Error(
        `Request failed with status code: ${response.status}: ${response.data}`
      );
    }
    // START JUST TO SEE IF EMBEDDINGS ARE RETURNED
    console.log(response.data);

    // IF EMBEDDINGS WORK, UNCOMMENT THE FOLLOWING
    // return response.data;
  } catch (error) {
    console.error(error);
  }
}

generateEmbeddings("MongoDB is AWESOME!!!");

// paste saveEmbeddings function

// paste queryEmbeddings function
