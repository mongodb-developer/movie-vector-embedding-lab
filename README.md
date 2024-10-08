# Notice: Repository Deprecation
This repository is deprecated and no longer actively maintained. It contains outdated code examples or practices that do not align with current MongoDB best practices. While the repository remains accessible for reference purposes, we strongly discourage its use in production environments.
Users should be aware that this repository will not receive any further updates, bug fixes, or security patches. This code may expose you to security vulnerabilities, compatibility issues with current MongoDB versions, and potential performance problems. Any implementation based on this repository is at the user's own risk.
For up-to-date resources, please refer to the [MongoDB Developer Center](https://mongodb.com/developer).


### MongoDB Atlas Vector Search Workshop

<h4 style="color:green">Looking to power an artificial intelligence with long term memory that could take over the world? Or maybe something simpler like retrieval augmented generation (RAG), semantic search, recommendation engines, or dynamic personalization. It all starts with the ability to search across the vector embeddings of your data.</h4>

<p>In this lesson, you will learn how to create vector embeddings to store inside MongoDB Atlas with machine learning models such as the ones provided by OpenAI and Hugging Face. Then you will see how easy it is to implement vector search across by using the <code>$vectorSearch</code> operator in the easy-to-learn, ever-extensible MongoDB aggregation framework you already know and love. 💚 </p>
<p>
With just a few code functions, a sample movie dataset, and a free forever MongoDB Atlas cluster, you will semantically search for movies based on their plot. Semantic search means we search across data using <i>intent</i> and <i>contextual meaning</i> for more relevant results. For instance, you can search for <code>cop</code> instead of <code>police man</code> and find both (and then some). Compare this to <i>full-text search</i> which only allows you to find words by spelling, not the general meaning. You know what I mean. 😉

**This project is based on the fantastic YouTube tutorial by Jesse Hall. Click to open the link to the tutorial and code along with Jesse.**

<br/>
<div align="center">
<a href="https://www.youtube.com/embed/wOdZ1hEWvjU?si=Z69G9eKLFKC4LfUs"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/JesseYouTube.png"" width="600"  /></a>
</div>

Atlas Vector Search works by sending your data of any type through an encoder to obtain vectors, simply an array of floats, as a numeric representation of that data in n-dimensional space. Each number in your array represents a property of that data object.

<div align="center"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/WhatIsVector.png" width="450"/></div>

Similar data is mapped closer to each other. In the image below, you can see that sports movies and superhero movies map to proximal clusters once vectorized.

<div align="center"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/MovieClusters.png" width="450"/></div>

Leveraging the MongoDB document data model, this n-dimensional array is then stored and indexed alongside your other data inside a document.<br>

```json
{
    "_id": "573a1390f29313caabcd5293",
    "title": "Hoosiers",
    "plot": "A coach with a checkered past and a local drunk train a small town ...",
    "year": 1996,
    "plot_embedding": [0.0729123, -0.0268332, -0.0315214, ...]
}
```

On the read side, you encode your query using the same encoder, and submit that vectorized query via the <code>$vectorSearch</code> aggregation stage to your data. The nearest neighbors in vector space to your query are returned as your search results.

<div align="center"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/HowVectorSearchWorks.png" width="600"/></div>

<h3 style="margin-top:10px">This workshop is broken down into 4 parts to teach you how to create and perform vector search on your MongoDB Atlas data.</h3>

<div align="center"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/StepsVectorSearch.png" style="border-radius: 10px" alt="steps" width="700"/></div>

- Create vector embeddings from the plots of movie documents using the encoding model <code>all-MiniLM-L6-v2</code> found on Hugging Face.
- Store those vector embeddings alongside your other data fields in your sample movie document.
- Index your movie documents using <code>knn</code>, the <code>cosine</code> similarity function, as well the dimensions of the <code>all-MiniLM-L6-v2</code> model.
- Query for your choice of movie using <code>$vectorSearch</code> aggregation operator!

<br/>
<h3>Prerequisites</h3>

<table>
<tr>
<td><div align="center">
<a href="https://huggingface.co/"><img src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/HuggingFace.png" width="300"  style="border-radius: 10px"/></a>
</div></td>
<td><div align="left" style="margin: 20px">This application was created using:

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies</div></td>
  </tr>
  </table>

  As such, you will need the following:<br>

* A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a><em> See how it is done: https://www.youtube.com/watch?v=jXgJyuBeb_o</em>
* A recent version of Node.js and npm.<br>
* Atlas sample dataset downloaded from Atlas UI<br>
* A <a href="https://huggingface.co/" >HuggingFace </a>access token.

<h2>Getting Set Up</h2>

1. Clone the repo.
2. Navigate inside directory <code>cd movie-vector-embedding-lab
   </code>
3. Run <code>npm install</code> .
4. Create a .env file in the root directory with the following environment variables:<br/>
   <code>MONGODB_CONNECTION_STRING=
   HF_ACCESS_TOKEN=
   </code>
5. Click the **Connect** button in the Atlas UI to find your MongoDB Atlas connection string for the Node.js driver in the Atlas UI. Replace your username and password before pasting into you <code>.env</code> file. It should look like this: <code>mongodb+srv://<username>:<password>@Cluster0.ecmzvfs.mongodb.net/?retryWrites=true&w=majority</code>
   <div align="center"><img src="images/ConnectionString.gif" width="600"  /></div>
6. Replace your HuggingFace access token, as well. You can obtain an access token from the <a href="https://huggingface.co/" >HuggingFace </a>website by following the steps in the gif below:

<div align="center"><a href="https://huggingface.co/"><img src="images/HFAccessToken.gif" width="450"  /></a>
</div>

Let's have a look at the **<code>main.js</code>** file. This is where we will execute the all the functionality needed for Atlas Vector Search in this workshop. Notice access to the environment variables on line 5: <br><code>const uri = process.env.MONGODB_CONNECTION_STRING;</code> and line 8 for your Hugging Face access token:<br><code>const hf_token = process.env.HF_ACCESS_TOKEN;</code><br>

<h2>Testing Atlas Cluster Connection</h2>
Let's make sure you have your **.env** file set up with your Atlas cluster connection string by executing the <code>main</code> file in the terminal. <br> Typing <code>node main</code> will execute the **main** function on <code>line 27</code>.<br><code>main().catch(console.dir);</code><br> In the <code>try</code> statement, the application will ping the client. If successful, the following message will appear in the console: <br><code>Pinged deployment. You successfully connected to your MongoDB Atlas cluster.</code>
<br> The app will finally close the connection to the Atlas cluster when finished: <br><code>Closing connection.</code>  <br>
If this is not working, make sure you have correctly whitelisted your IP address. If you are connecting successfully, we can start searching for vectors!

<h2 style="color:green">Let's Get Started!</h2>

If you got this far, then you have successfully connected to your Atlas cluster, and we can start creating vector embeddings. Go ahead and comment out <code>line 27. main().catch(console.dir);</code> in the <code>main.js</code> file since we no longer need to execute that functionality. <br></br>
All of the code for the following steps can be found in the **functionDefinitions.js** file.

<table>
<tr>
<td width="200"><img style="border-radius: 10px; float:left; margin-right:20px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/Step1.png"  /></td>
<td ><h4 style="color:indigo; margin-left:20px" >Step 1: Create vector embeddings for movie plot.</h4> In the **functionDefinitions.js** file, the <code>generateEmbeddings</code> function is on lines 2 - 28. <br>

```
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
        // LOG JUST TO TEST IF EMBEDDINGS ARE RETURNED
        console.log(response.data);

        // IF EMBEDDINGS WORK, UNCOMMENT THE FOLLOWING
        // return response.data;

    } catch (error) {
        console.error(error);
    }
}
```

<br>Copy this function and paste it into the your <b>main.js</b> file. <br> Notice that it makes a POST call to the HuggingFace hosted embedding url using your HuggingFace access token. If successful, the function will log the array of floats to the console. <h3 style="color:blue">Test the **generateEmbeddings** functionality by executing <code>generateEmbeddings("MongoDB is AWESOME!!!");</code> </h3> <h3>Now re-run the application by typing <code>node main</code> in the console.</h3> Et voilà!<br><img style="border-radius: 10px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/EmbeddingsGenerated.png" width="400" /><br> Since we see that the embeddings are generated, we will need to return them from the function. Before moving on, let's **COMMENT OUT** <code>console.log(response.data);</code> and let's **UNCOMMENT** <code>return response.data;</code> inside the **generateEmbeddings** function. Also, let's **DELETE** <code>generateEmbeddings("MongoDB is AWESOME!!!")</code>.</code></td>

</tr>
<tr>
<td width="200"><img style="border-radius: 10px; float:left; margin-right:20px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/Step2.png"  /></td>
<td width="700"><h3 style="color:indigo; margin-left:20px">Step 2: Store newly acquired plot embeddings directly in your movie documents.</h3> In the <b>functionDefinitions.js</b> file, the <code>saveEmbeddings</code> function is on lines 31 - 52.

```
async function saveEmbeddings() {
  try {
    await client.connect();

    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const docs = await collection
      .find({ plot: { $exists: true }, genres: "Horror" })
      .limit(100)
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
```

Copy this function and paste it into the your `main.js` file. <br> Notice this function will look in the <b>sample_mflix.movies</b> collection for 100 scary movies 🧟 with a plot field.
<code><br>
const docs = await collection.find({ plot: { $exists: true }, genres: "Horror" }).limit(100).toArray();
</code><br><em>Feel free to change the filter to look for other movie types that suit you. Comedies movies can be fun, too. </em>🎭 🤣<br>For each of these 100 movies, this function will use the recently created <code>generateEmbeddings</code> function to obtain vectorized embeddings for the plot field and save them in a new <code>plot_embedding_hf</code> field before replacing the movie document.<br>Execute this function by pasting the call:<br><code>saveEmbeddings();</code> in the <b>main.js</b> file.<h3>Now re-run the application by typing <code>node main</code> in the console.</h3>You should see the updated documents being logged in the console. <div align="center"><img style="border-radius: 10px; margin-top:10px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/saveEmbeddings.png" width="300" /></div>Inside the Atlas UI, you can use the Data Explorer in the Collections tab to filter for movies with your new vectorized plot fields using the filter:<code>{plot_embedding_hf:{$exists:true}}</code><div align="center"></div><img align="center" style="border-radius: 10px; margin-top:10px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/movieDoc.png" width="400" /></div><br>Before moving to the next step, **COMMENT OUT** the call to execute saveEmbeddings<code>saveEmbeddings();</code>

</td>
</tr>
<tr>
<td width="200"><img style="border-radius: 10px; float:left; margin-right:20px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/Step3.png"  /></td>
<td><h6 style="color:indigo; margin-left:20px">Step 3: Create a vector index on the plot embedding field leveraging the Atlas UI.</h6></h6>Now that we have the plots of 100 different movies vectorized and stored as an array of floats, we will need to index the new <code>plot_embedding_hf</code> fields before we can search through them.<br> Still in our Atlas UI on the Collections tab:<br>
- Go to Search Indexes
- Click Create Search Index
- Under <b>Atlas Vector Search</b>, use the JSON editor
- name the index <code>vector_index</code>
- from the <code>indexDefinition.txt</code> file, copy the index definition:<br>

```json
json
{
  "fields":[
    {
      	"type": "vector",
      	"path": "plot_embedding_hf",
    	"numDimensions":384,
        "similarity":"cosine",
    }
  ]
}
```

Notice this knnVector type index will use the cosine similarity function, which is great for mapping text data, and the 384 dimensions, the length of the vector arrays provided by HuggingFace's <code>all-MiniLM-L6-v2</code> encoding model.

With this definition, **"plot_embedding_hf"** is the only field indexed.</td>

</tr>
<tr>
<td width="200"><img style="border-radius: 10px; float:left; margin-right:20px" src="https://kwh-demos.s3.amazonaws.com/vector-embedding-lab-assets/Step4.png"  /></td>
<td><h6 style="color:indigo; margin-left:20px">Step 4: Search semantically with the <code>$vectorSearch</code> aggregation operator.</h6>We are *finally* ready to use <code>$vectorSearch</code> to search for that horror flick whose name is on the tip of our tongue... You know the one...  🤔 <br>
Find the <code>queryEmbeddings</code> function in the <b>functionDefinitions.js</b> and paste into the <code>main</code> file.

```
async function queryEmbeddings(query) {
    try {
        await client.connect();
        const db = client.db("sample_mflix");
        const collection = db.collection("movies");

        const vectorizedQuery = await generateEmbeddings(query);

        results = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "vectorIndex",
                    queryVector: vectorizedQuery,
                    path: "plot_embedding_hf",
                    numCandidates: 100,
                    limit: 8,
                },
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    plot: 1,
                },
            },
        ]).toArray();
        console.log(results);

    } finally {
        console.log("Closing connection.");
        await client.close();
    }
}
```

<div>
Notice the function parameter called "query." This is the description of the movie we provide. In order to perform vector search, we need to vectorize that description query using the <code>generateEmbeddings</code> function and store those vectors in the constant <code>vectorizedQuery</code>. We have to vectorize the query using the same <code>all-MiniLM-L6-v2</code> embedding model we used to vectorize our movie plots in order to compare them.</div><br>
<div><div>Now we can run an aggregation on the <code>sample_mflix.movies</code> collection.</div>

- The 1st stage uses the <code>$vectorSearch</code> operator along with our <code>vectorIndex</code> to search for our query in the <code>plot_embedding_hf</code> path and returns the closest 4 matches.
- The 2nd stage uses <code>$project</code> to return to the client only the <b>title</b> and the <b>plot</b> fields.
</div>
<div>We then convert the matching movies results from a cursor to an array before printing them to the console.</div><br>

Without further adieu, let's search for a good horror flick by calling :<br>

```
queryEmbeddings("enormous creatures attacking earth");
```

Now returning to the terminal, type <code>node main</code> one last time.<br>
Drumroll, please!<br>

</td>
</tr>

</table>

<div align="center"><img src="images/queryMovies.gif" style="border-radius: 10px" alt="demo" width="600" /></div>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

If you have any questions or feedback about this repo, feel free to create an Issue or PR in this repo.

Also please join our online <a href="https://developer.mongodb.com/community/forums/">MongoDB Community</a> to interact with our product and engineering teams along with thousands of other MongoDB and Realm users. <br/><br/>Have fun and happy coding!
