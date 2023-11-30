exports = async function ({ query }) {
  console.log("VECTOR SEARCHING FOR MOVIES");

  let semanticSearchTerms = query.semanticSearchTerms;
  // get vector embeddings for the query

  try {
    const embedding = await context.functions.execute(
      "getEmbedding",
      semanticSearchTerms
    );
    const movies = await context.functions.execute(
      "vectorSearchDocuments",
      embedding
    );

    console.log(movies);

    return movies;
  } catch (err) {
    console.error(err);
  }
};
