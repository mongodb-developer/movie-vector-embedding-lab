// GENERATE EMBEDDINGS
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

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// SAVE PLOT EMBEDDINGS to 50 MOVIES
async function saveEmbeddings() {
  try {
    await client.connect();

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const docs = await collection
      .find({ plot: { $exists: true } })
      .limit(50)
      .toArray();

    for (let doc of docs) {
      doc.plot_embedding_hf = await generateEmbeddings(doc.plot);
      await collection.replaceOne({ _id: doc._id }, doc);
      console.log(`Updated ${doc._id}`);
    }
  } finally {
    console.log("Closing connection.");
    await client.close();
  }
}

async function queryEmbeddings(query) {
  try {
    await client.connect();

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    results = await collection
      .aggregate([
        {
          $vectorSearch: {
            index: "plotSemanticIndex",
            queryVector: await generateEmbeddings(query),
            path: "plot_embedding_hf",
            numCandidates: 100,
            limit: 4,
          },
        },
        {
          $project: {
            _id: 0,
            title: 1,
            plot: 1,
          },
        },
      ])
      .toArray();
    console.log(results);
  } finally {
    console.log("Closing connection.");
    await client.close();
  }
}

queryEmbeddings("imaginary characters from outer space");
