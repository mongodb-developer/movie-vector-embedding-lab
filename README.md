## MongoDB Atlas Vector Search Workshop

<h3>Atlas Vector Search Workshop
</h3>
Atlas Vector Search allows developers to take advantage of sophisticated, off-the-shelf machine learning models to power the transformative applications of the future. With Atlas Vector Search, you can a variety of AI-powered use cases quickly to your application with ease.
<br/>
MongoDB Atlas Vector Search provides a lightning fast approximate nearest neighbor search through high dimensional data that you can capture directly in your MongoDB documents. 
<br/>
This workshop will teach you how to

- Create vector embeddings from the plots of movie documents.
- Leverage the data model to store those vector embeddings alongside your other data fields.
- Index your movie documents using knn, a similarity function, and the dimensions of the encoding model <code>all-MiniLM-L6-v2</code>.

<br/> By the end, you can search semantically through the sample_mflix.movies dataset offered free to download on MongoDB Atlas.

<br/>
<div align="center">
<img src="Mflix.png" width="650"  />
</div>
<br/>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

<p>This application was created using:</p>

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies

<h3>Prerequisites</h3>

- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
- A recent version of Node.js and npm.
- Atlas sample dataset

<h2>Prepare Data</h2>

<ol>
<li> Load data to Atlas cluster:
<ul>
<li>database: <code>sample_mflix</code></li>
<li>collection: <code>movies</code></li>
</ul>
</li>

<h2>To Build and Run This Application....</h2>

1. Clone the repo.
2. Navigate inside directory.
3. Run <code>npm install</code> .
4. Create a .env file with<br/> <code>MONGODB_CONNECTION_STRING=
   HF_ACCESS_TOKEN=
   OPENAI_KEY=</code>

### Atlas Search Workshop:

If you have any questions or feedback about this repo, feel free to create an Issue or PR in this repo or reach out to me on Twitter @YouOldMaid.

Also please join our online <a href="https://developer.mongodb.com/community/forums/">MongoDB Community</a> to interact with our product and engineering teams along with thousands of other MongoDB and Realm users. <br/><br/>Have fun and happy coding!
