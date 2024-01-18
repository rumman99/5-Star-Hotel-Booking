require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const { initializeApp } = require('firebase-admin/app');
const express= require('express');
const cors= require('cors');
const bodyParser= require('body-parser');
const port= 3333;

///// Firebase Admin Private Key /////
const admin = require("firebase-admin");
const serviceAccount = require("./config/baper-dokan0-firebase-adminsdk-m8pq3-d4ac629569.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app= express();
app.use(cors(
	    {
		origin: ["https://am-mart.vercel.app"],
		method: ["POST", "GET"],
		credentials: true
	    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Database Connection ////////////////////////////////////////////////////////////////////////////////////////////////////
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-rumman0.pqu8dwy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.get('/', (req, res)=>{
//     res.send('Express Connected :)')
// });


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(process.env.DB_NAME).command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
    const databaseCollection= client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION); //Database and Collection Name//

//// Create Post Method for Write on Database////
    app.post('/booking', (req, res)=>{
      databaseCollection.insertOne(req.body, console.log("Insert To DATABSE Successful"));
    });

//// Read Get Method for Booking List ///////////
    app.get('/bookingList', (req, res)=>{
    // clientSideToken comes from the client app
      const clientSideToken= req.headers.authorization;
      if(clientSideToken && clientSideToken.startsWith('Bearer')){
        const idToken= clientSideToken.split(' ')[1];
        admin.auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            const serverSideEmail = decodedToken.email;
            const clientSideEmail= req.query.email;
             // Check if the emails match
            if(serverSideEmail === clientSideEmail){
              databaseCollection.find({email:req.query.email}).toArray()
              .then(data => res.status(200).send(data))
            }
            else{
              res.status(401).send('Unauthorized Request');

            }
          })
          .catch((error) => {
            // Handle error
            res.status(401).send('Unauthorized Request');
            console.log(error);
          });
      }
      else{
        res.status(401).send('Unauthorized Request');
      }
    })


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(process.env.PORT || port, console.log("Listening to PORT: 3333"));