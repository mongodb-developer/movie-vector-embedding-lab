exports = async function (query) {
  console.log("GETTING EMBEDDING");

  const axios = require("axios");
  const url = "https://api.openai.com/v1/embeddings";
  const openai_key = context.values.get("OPENAI_SECRET");

  // Call OpenAI API to get the embeddings.
  let response = await axios.post(
    url,
    {
      input: query,
      model: "text-embedding-ada-002",
    },
    {
      headers: {
        Authorization: `Bearer ${openai_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.data.data[0].embedding;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${response.status}`);
  }
};
