exports = async function vectorSearchDocuments(embedding) {
  console.log("FINDING SIMILAR MOVIES");
  const collection = context.services
    .get("mongodb-atlas")
    .db("sample_mflix")
    .collection("embedded_movies");

  // Query for similar documents.
  // make sure index field uses the correct vector index name
  const documents = await collection
    .aggregate([
      {
        $vectorSearch: {
          index: "vectorIndex",
          queryVector: embedding,
          path: "plot_embedding",
          numCandidates: 100,
          limit: 12,
        },
      },

      {
        $project: {
          title: 1,
          year: 1,
          "imdb.rating": 1,
          fullplot: 1,
          poster: 1,
          released: 1,
          genres: 1,
          score: 100,
        },
      },
    ])
    .toArray();

  return documents;
};
