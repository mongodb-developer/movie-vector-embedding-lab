const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;

require("dotenv").config();
const uri = process.env.MONGODB_TEST_STRING;
const OPENAI_KEY = process.env.OPENAI_KEY;

const client = new MongoClient(uri);

async function getEmbedding(query) {
  // Define the OpenAI API url and key.
  const url = "https://api.openai.com/v1/embeddings";

  // Call OpenAI API to get the embeddings.
  let response = await axios.post(
    url,
    {
      input: query,
      model: "text-embedding-ada-002",
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.data.data[0].embedding;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${response.status}`);
  }
}

async function findSimilarDocuments(embedding) {
  const url = uri; // Replace with your MongoDB url.
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("sample_mflix"); // Replace with your database name.
    const collection = db.collection("embedded_movies"); // Replace with your collection name.

    // Query for similar documents.
    const documents = await collection
      .aggregate([
        {
          $vectorSearch: {
            queryVector: embedding,
            path: "plot_embedding",
            numCandidates: 100,
            limit: 5,
            index: "default",
          },
        },
        {
          $project: {
            title: 1,
            plot: 1,
          },
        },
      ])
      .toArray();

    return documents;
  } finally {
    await client.close();
  }
}

async function main_text() {
  const query = "James Bond saves the world from the bad guy on a beach"; // Replace with your query.
  var args = process.argv[2];
  console.log("ARGS", args);
  try {
    const embedding = await getEmbedding(args);
    const documents = await findSimilarDocuments(embedding);
    // console.log(embedding);
    console.log(documents);
  } catch (err) {
    console.error(err);
  }
}

main_text();
