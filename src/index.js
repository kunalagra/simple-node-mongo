const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const {MongoClient} = require('mongodb');
const PORT = process.env.PORT || 3000
const uri = process.env.dbURL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Fetch All Employee
app.get('/getEmp', async (req, res) => {
	let cursor = await client.db("ESD").collection("Employee").find().toArray()
	return res.send(cursor)
});

// Add Employee
app.post('/addEmp', async (req, res) => {
	client.db("ESD").collection("Employee").insertOne(req.body)
	.then(res.status(200).send("User Addded "))
	.catch((e)=>res.send(e))
})

// Update/Insert Employee
app.put('/updEmp', async (req, res) => {
	client.db("ESD").collection("Employee").updateOne({"PHONE_NUMBER": req.body.PHONE_NUMBER}, 
		{"$set": req.body},{upsert:true}).then(data => {
			if (data.modifiedCount == 1){
				res.status(200).send("User Updated!")
			}
			else{
				res.status(200).send("User Created")
			}
		})
	})

// Delete Employee
app.delete('/delEmp',async (req,res)=>{
	client.db("ESD").collection("Employee").deleteOne({"PHONE_NUMBER": req.body.PHONE_NUMBER})
	.then(data=> {
		if (data.deletedCount==1){

			res.status(200).send("Employee Record Deleted")
		}
		else{
			res.status(404)
			.send("Employee Not Found!")
		}
	})
})


client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});
