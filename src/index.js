const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const {MongoClient} = require('mongodb');
const PORT = process.env.PORT || 3000
const uri = process.env.dbURL;
const client = new MongoClient(uri);


// Fetch All Employee
app.get('/getEmp', async (req, res) => {
	cursor = client.db("ESD").collection("Employee").find()
	data = await cursor.toArray()
	return res.json(data)
});


client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});
