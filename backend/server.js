const express = require("Express");
const app = express();
const { connectDB, getDB } = require("./connection");
const cors = require("cors");

connectDB();

app.use(cors());

app.get("/", (req, res) => {
    return res.send("Hello world!");
});

app.get("/interviewersList", async (req, res) => {
    const db = getDB();
    const collection = db.collection("interviewers");
    const list = await collection.find({}).toArray();
    console.log(list);
    res.status(200).json({"data": list});
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
