### MongoDB Atlas Vector Search Workshop

<h4 style="color:green">Looking to power an artificial intelligence with long term memory that could take over the world? Or maybe something simpler like retrieval augmented generation (RAG), semantic search, recommendation engines, or dynamic personalization. It all starts with the ability to search across vector embeddings.</h4>

<p>In this lesson, using a sample movie dataset and a free forever MongoDB Atlas cluster, you will semantically search for movies based on their plot. Semantic search is searching across data using <i>intent</i> and <i>contextual meaning</i> for more relevant results. This means you can search for <code>cop</code> instead of <code>police man </code> and find both (and then some). Whereas full-text search will only allow you to find words by spelling, not the general meaning. You know what I mean. 😉

**This project is based on the fantastic YouTube tutorial by Jesse Hall. Click to open the link to the tutorial and code along with Jesse.**

<br/>
<div align="center">
<a href="https://www.youtube.com/embed/wOdZ1hEWvjU?si=Z69G9eKLFKC4LfUs"><img src="images/JesseYouTube.png" width="600"  /></a>
</div>

This workshop will teach you how to

- Create vector embeddings from the plots of movie documents.
- Leverage the data model to store those vector embeddings alongside your other data fields.
- Index your movie documents using knn, a similarity function, and the dimensions of the encoding model <code>all-MiniLM-L6-v2</code> found on Hugging Face.

<br/>

<p>This application was created using:</p>

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies

<div align="center"><div style="display: flex;  justify-content: space-around;">
<a href="https://huggingface.co/"><img src="images/HuggingFace.png" width="300"  /></a><div align="left" style="margin: 20px">This application was created using:

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies</div></div>
</div>

<div align="center"><a href="https://huggingface.co/"><img src="images/HFAccessToken.gif" width="500"  /></a>
</div>

<h3>Prerequisites</h3>

- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a> See how it is done: https://www.youtube.com/watch?v=jXgJyuBeb_o
- A recent version of Node.js and npm.
- Atlas sample dataset
- A HuggingFace access token

https://www.youtube.com/watch?v=jXgJyuBeb_o
learn to create vector embeddings with machine learning models like OpenAI and Hugging Face. Then store those embeddings directly in MongoDB Atlas. Once in Atlas, use $vectorSearch to
<br/><br/>
MongoDB Atlas Vector Search provides a lightning fast approximate nearest neighbor search through high dimensional data that you can capture directly in your MongoDB documents.
<br/>

<h2>To Build and Run This Application....</h2>

1. Clone the repo.
2. Navigate inside directory.
3. Run <code>npm install</code> .
4. Create a .env file with<br/>
   <code>MONGODB_CONNECTION_STRING=
   HF_ACCESS_TOKEN=
   OPENAI_KEY=</code>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

If you have any questions or feedback about this repo, feel free to create an Issue or PR in this repo.

Also please join our online <a href="https://developer.mongodb.com/community/forums/">MongoDB Community</a> to interact with our product and engineering teams along with thousands of other MongoDB and Realm users. <br/><br/>Have fun and happy coding!
