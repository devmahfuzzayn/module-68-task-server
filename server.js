const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Module 68 Task Server is Running!!!");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wfuffuf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        await client.connect();

        const teasCollection = client.db("teasDB").collection("teas");
        const syrupsCollection = client.db("syrupsDB").collection("syrups");
        const milksCollection = client.db("milksDB").collection("milks");

        // Teas
        app.get("/teas", async (req, res) => {
            const result = await teasCollection.find().toArray();
            res.send(result);
        });

        app.get("/teas/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await teasCollection.findOne(query);
            res.send(result);
        });

        app.post("/addTea", async (req, res) => {
            const tea = req.body;
            const result = await teasCollection.insertOne(tea);
            res.send(result);
        });

        app.put("/teas/update/:id", async (req, res) => {
            const id = req.params.id;
            const updatedTea = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const tea = {
                $set: {
                    name: updatedTea.name,
                    quantity: updatedTea.quantity,
                    supplier: updatedTea.supplier,
                    taste: updatedTea.taste,
                    category: updatedTea.category,
                    details: updatedTea.details,
                    photo: updatedTea.photo,
                },
            };
            const result = await teasCollection.updateOne(filter, tea, options);
            res.send(result);
        });

        app.delete("/teas/delete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await teasCollection.deleteOne(query);
            res.send(result);
        });
        // Teas

        // Syrups
        app.get("/syrups", async (req, res) => {
            const result = await syrupsCollection.find().toArray();
            res.send(result);
        });

        app.get("/syrups/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await syrupsCollection.findOne(query);
            res.send(result);
        });

        app.post("/addSyrup", async (req, res) => {
            const syrup = req.body;
            const result = await syrupsCollection.insertOne(syrup);
            res.send(result);
        });

        app.put("/syrups/update/:id", async (req, res) => {
            const id = req.params.id;
            const updatedSyrup = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const syrup = {
                $set: {
                    name: updatedSyrup.name,
                    quantity: updatedSyrup.quantity,
                    supplier: updatedSyrup.supplier,
                    taste: updatedSyrup.taste,
                    category: updatedSyrup.category,
                    details: updatedSyrup.details,
                    photo: updatedSyrup.photo,
                },
            };
            const result = await syrupsCollection.updateOne(
                filter,
                syrup,
                options
            );
            res.send(result);
        });

        app.delete("/teas/delete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await syrupsCollection.deleteOne(query);
            res.send(result);
        });
        // Syrups

        // Milks
        app.get("/milks", async (req, res) => {
            const result = await milksCollection.find().toArray();
            res.send(result);
        });

        app.get("/milks/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await milksCollection.findOne(query);
            res.send(result);
        });

        app.post("/addMilk", async (req, res) => {
            const milk = req.body;
            const result = await milksCollection.insertOne(milk);
            res.send(result);
        });

        app.put("/milks/update/:id", async (req, res) => {
            const id = req.params.id;
            const updatedMilk = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            console.log(updatedMilk)
            const milk = {
                $set: {
                    name: updatedMilk.name,
                    quantity: updatedMilk.quantity,
                    supplier: updatedMilk.supplier,
                    taste: updatedMilk.taste,
                    category: updatedMilk.category,
                    details: updatedMilk.details,
                    photo: updatedMilk.photo,
                },
            };
            const result = await milksCollection.updateOne(
                filter,
                milk,
                options
            );
            res.send(result);
        });

        app.delete("/milks/delete/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await milksCollection.deleteOne(query);
            res.send(result);
        });
        // Milks

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Finally code goes here...
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Module 68 Task Server is Running on Port: ${port}`);
});
