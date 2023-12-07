## MongoDB Atlas Vector Search Workshop

<h2>Looking to power an artificial intelligence with long term memory that could take over the world ?</h2>
<p>Or even something simpler... In this lesson, you will learn to create vector embeddings with machine learning models like OpenAI and Hugging Face, and store them in Atlas for retrieval augmented generation (RAG), semantic search, recommendation engines, dynamic personalization, and other use cases.</p>
<br/>
MongoDB Atlas Vector Search provides a lightning fast approximate nearest neighbor search through high dimensional data that you can capture directly in your MongoDB documents. 
<br/>
This workshop will teach you how to

- Create vector embeddings from the plots of movie documents.
- Leverage the data model to store those vector embeddings alongside your other data fields.
- Index your movie documents using knn, a similarity function, and the dimensions of the encoding model <code>all-MiniLM-L6-v2</code>.

<br/> By the end, you can search semantically through the sample_mflix.movies dataset offered free to download on MongoDB Atlas.

**This project is based on the fantastic YouTube tutorial by Jesse Hall. Click below to open the link to the tutorial and code along with Jesse.**

<br/>
<div align="center">
<a href="https://www.youtube.com/embed/wOdZ1hEWvjU?si=Z69G9eKLFKC4LfUs"><img src="JesseYouTube.png" width="600"  /></a>
</div>
<br/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/wOdZ1hEWvjU?si=Z69G9eKLFKC4LfUs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<p>This application was created using:</p>

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies

<h3>Prerequisites</h3>

- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
- A recent version of Node.js and npm.
- Atlas sample dataset

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
