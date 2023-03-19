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

col = client.db("ESD").collection("Employee")

// Fetch All Employee
app.get('/getEmp', (req, res) => {
	const cursor = col.find()
	cursor.toArray()
	.then(data => {res.json(data)})
});

// Add Employee
app.post('/addEmp', (req, res) => {
	col.insertOne(req.body)
	.then(res.status(200).send("User Addded "))
	.catch((e)=>res.send(e))
})

// Update/Insert Employee
app.put('/updEmp', (req, res) => {
	col.updateOne({"PHONE_NUMBER": req.body.PHONE_NUMBER}, 
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
app.delete('/delEmp',(req,res)=>{
	col.deleteOne({"PHONE_NUMBER": req.body.PHONE_NUMBER})
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
