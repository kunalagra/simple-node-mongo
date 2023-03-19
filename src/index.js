const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const {
    MongoClient
} = require('mongodb');
const PORT = process.env.PORT || 3000
const uri = process.env.dbURL;
const client = new MongoClient(uri);


// Fetch All Employee
// Fetch All Employee
app.get('/getEmp', async(req, res) => {
    let cursor = await col.find().toArray()
    return res.status(200)
	    .send(cursor)
});

// Add Employee
app.post('/addEmp', async(req, res) => {
    col.insertOne(req.body)
        .then(res.status(200)
	      .send("User Addded "))
        .catch((e) => res.send(e))
});

// Update/Insert Employee
app.put('/updEmp', async(req, res) => {
    col.updateOne({
        "PHONE_NUMBER": req.body.PHONE_NUMBER
    }, {
        "$set": req.body
    }, {
        upsert: true
    }).then(data => {
        if (data.modifiedCount == 1) {
            res.status(200)
		    .send("User Updated!")
        } else {
            res.status(200)
		    .send("User Created")
        }
    })
});

// Delete Employee
app.delete('/delEmp', async(req, res) => {
    col.deleteOne({
            "PHONE_NUMBER": req.body.PHONE_NUMBER
        })
        .then(data => {
            if (data.deletedCount == 1) {

                res.status(200)
			.send("Employee Record Deleted")
            } else {
                res.status(404)
                    .send("Employee Not Found!")
            }
        })
});

client.connect(
    // connection to mongo is successful, listen for requests
    app.listen(3000, () => {
        console.log("listening for requests");
    }),
    col = client.db("ESD").collection("Employee")

);
