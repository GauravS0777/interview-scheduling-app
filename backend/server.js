const express = require("Express");
const app = express();
const { connectDB, getDB } = require("./connection");
const cors = require("cors");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const { validateAccessToken } = require("./validateToken");
const { ObjectId } = require('mongodb');

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/user", authRouter);

app.get("/", (req, res) => {
    return res.send("Hello world!");
});

app.get("/interviewersList", validateAccessToken, async (req, res) => {
    if(!req.user.isTA){
        res.status(401).json({});
    }
    
    const db = getDB();
    const collection = db.collection("users");
    let list = await collection.find({isTA: false}).toArray();

    const reqCollection = db.collection("requests");

    const temp = await reqCollection.distinct("interviewerID", {"taID": req.user._id});

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

app.post("/sendRequest", validateAccessToken, async (req, res) => {
    // console.log(req.body);

    if(!req.user.isTA){
        res.status(401).json({});
    }

    const db = getDB();
    const collection = db.collection("requests");

    const { interviewerID, time } = req.body;
    const { _id } = req.user;

    await collection.insert({
        "taID": _id,
        "interviewerID": interviewerID,
        "time": time
    });

    res.status(200).json({});
})


app.post("/cancelRequest", validateAccessToken, async (req, res) => {
    // console.log(req.body);

    if(!req.user.isTA){
        res.status(401).json({});
    }

    const db = getDB();
    const collection = db.collection("requests");
    const {interviewerID} = req.body;
    const {_id} = req.user;
    await collection.deleteOne({"interviewerID": interviewerID, "taID": _id});

    res.status(200).json({});
})



app.get("/getRequests", validateAccessToken, async (req, res) => {
    if(req.user.isTA){
        return res.status(401).json({});
    }

    const db = getDB();
    const collection = db.collection("requests");
    const requests = await collection.find({"interviewerID": req.user._id}).toArray();
    return res.status(200).json({"data": requests});    
})




app.get("/getUsername", validateAccessToken, async (req, res) => {
    console.log(req.user);
    const db = getDB();
    const collection = db.collection("users");
    const ob = await collection.findOne({_id: ObjectId(req.user._id)});

    res.status(200).json(ob);
})


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
