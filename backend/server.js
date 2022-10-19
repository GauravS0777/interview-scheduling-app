const express = require("Express");
const app = express();
const { connectDB, getDB } = require("./connection");
const cors = require("cors");

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Hello world!");
});

app.get("/interviewersList", async (req, res) => {
    const db = getDB();
    const collection = db.collection("interviewers");
    let list = await collection.find({}).toArray();

    const reqCollection = db.collection("requests");
    const temp = await reqCollection.distinct("interviewerID");

    list = list.map((value) => {
        if(temp.includes(value._id.toString())){
            value.busy = true;
        }else{
            value.busy = false;
        }

        return value
    })

    console.log(list)

    // console.log(list);
    res.status(200).json({"data": list});
})

app.post("/sendRequest", async (req, res) => {
    // console.log(req.body);

    const db = getDB();
    const collection = db.collection("requests");
    await collection.insert(req.body);

    res.status(200).json({});
})


app.post("/cancelRequest", async (req, res) => {
    // console.log(req.body);

    const db = getDB();
    const collection = db.collection("requests");
    await collection.deleteOne(req.body);

    res.status(200).json({});
})

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
