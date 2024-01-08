### MongoDB Atlas Vector Search Workshop

<h4 style="color:green">Looking to power an artificial intelligence with long term memory that could take over the world? Or maybe something simpler like retrieval augmented generation (RAG), semantic search, recommendation engines, or dynamic personalization. It all starts with the ability to search across the vector embeddings of your data.</h4>

<p>In this lesson, you will learn how to create vector embeddings to store inside MongoDB Atlas with machine learning models such as the ones provided by OpenAI and Hugging Face. Then you will see how easy it is to implement vector search across by using the <code>$vectorSearch</code> operator in the easy-to-learn, ever-extensible MongoDB aggregation framework you already know and love. "GREEN HEART" </p>
<p>
In just a few simple code functions, a sample movie dataset, and a free forever MongoDB Atlas cluster, you will semantically search for movies based on their plot. Semantic search means we search across data using <i>intent</i> and <i>contextual meaning</i> for more relevant results. For instance, you can search for <code>cop</code> instead of <code>police man</code> and find both (and then some). Compare this to <i>full-text search</i> which only allows you to find words by spelling, not the general meaning. You know what I mean. 😉

**This project is based on the fantastic YouTube tutorial by Jesse Hall. Click to open the link to the tutorial and code along with Jesse.**

<br/>
<div align="center">
<a href="https://www.youtube.com/embed/wOdZ1hEWvjU?si=Z69G9eKLFKC4LfUs"><img src="images/JesseYouTube.png" width="600"  /></a>
</div>

This workshop is broken down into 4 parts to teach you how to create and perform vector search on your MongoDB Atlas data.

<div align="center"><img src="images/StepsVectorSearch.png" style="border-radius: 10px" alt="steps"/></div>

- Create vector embeddings from the plots of movie documents using the encoding model <code>all-MiniLM-L6-v2</code> found on Hugging Face.
- Store those vector embeddings alongside your other data fields in your sample movie document.
- Index your movie documents using <code>knn</code>, the <code>cosine</code> similarity function, as well the dimensions of the <code>all-MiniLM-L6-v2</code> model.
- Query for your choice of movie using <code>$vectorSearch</code> aggregation operator!

<br/>
<h3>Prerequisites</h3>
<div align="center">
<a href="https://huggingface.co/"><img src="images/HuggingFace.png" width="300"  style="border-radius: 10px"/></a>
</div>
<div align="left" style="margin: 20px">This application was created using:

- Node.js
- Hugging Face sentence-transformers/all-MiniLM-L6-v2 model
- The Atlas sample dataset of sample_mflix.movies</div>
  As such, you will need the following:<br>
- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a> <hr>See how it is done: https://www.youtube.com/watch?v=jXgJyuBeb_o<hr>
- A recent version of Node.js and npm.<br>
- Atlas sample dataset<br>
- A <a href="https://huggingface.co/" >HuggingFace </a>access token.

<div align="center"><a href="https://huggingface.co/"><img src="images/HFAccessToken.gif" width="400"  /></a>
</div>

<h2>To Build and Run This Application....</h2>

1. Clone the repo.
2. Navigate inside directory <code>cd movie-vector-embedding-lab
   </code>
3. Run <code>npm install</code> .
4. Create a .env file in the root directory with the following environment variables:<br/>
   <code>MONGODB_CONNECTION_STRING=
   HF_ACCESS_TOKEN=
   OPENAI_KEY=</code>

<h2 style="color:green">Let's Get Started!</h2>

<div  style="display:flex">
  <img style="border-radius: 10px; float:left" src="images/Step1.png" width="200" />
  
  <h4 style="color:indigo; margin-left:20px">Step 1: Create vector embeddings for movie plot.</h4>
</div>

<div  style="display:flex; margin-top:20px"">
  <img style="border-radius: 10px" src="images/Step2.png" width="200" />
  
  <h4 style="margin-left:20px">Type stuff here</h4>
</div>

<div  style="display:flex">
  <img style="border-radius: 10px" src="images/Step3.png" width="200" />
  
  <h4 style="margin-left:20px">Type stuff here</h4>
</div>

<div  style="display:flex">
  <img style="border-radius: 10px" src="images/Step4.png" width="200" />
  
  <h4 style="margin-left:20px">Type stuff here</h4>
</div>

<h4 style="color:indigo">Step 2: Store newly acquired plot embeddings directly in your movie documents.</h4>
<h4 style="color:indigo">Step 3: Index embeddings via the Atlas UI.</h4>
<h4 style="color:indigo">Step 4: Search semantically with the <code>$vectorSearch</code> aggregation operator.</h4>

<hr>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

If you have any questions or feedback about this repo, feel free to create an Issue or PR in this repo.

Also please join our online <a href="https://developer.mongodb.com/community/forums/">MongoDB Community</a> to interact with our product and engineering teams along with thousands of other MongoDB and Realm users. <br/><br/>Have fun and happy coding!
