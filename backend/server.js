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


const getUserDetails = async (_id) => {
    const db = getDB();
    const collection = db.collection("users");
    const ob = await collection.findOne({_id: ObjectId(_id)});
    return ob;
}


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
    let list = await collection.find({isTA: false}).project({name: 1}).toArray();

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

    console.log("hey", list)

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

    const { interviewerID, candidateID, time } = req.body;
    const { _id } = req.user;

    await collection.insert({
        "taID": _id,
        "interviewerID": interviewerID,
        "candidateID": candidateID,
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


app.get("/fetchInterviews", validateAccessToken, async (req, res) => {
    if(req.user.isTA){
        return res.status(401).json({});
    }

    const db = getDB();
    const collection = db.collection("accepted");
    const interviews = await collection.find({
        "interviewerID": req.user._id, 
        "time":{"$gte": new Date().toISOString()}
    }).toArray();
    console.log(req.user._id, interviews);
    return res.status(200).json({"data": interviews});    
})


app.get("/acceptedInterviews", validateAccessToken, async (req, res) => {
    if(!req.user.isTA){
        return res.status(401).json({});
    }

    const db = getDB();
    const collection = db.collection("accepted");
    let interviews = await collection.find({
        "taID": req.user._id, 
        "time":{"$gte": new Date().toISOString()}
    }).toArray();
    interviews = await Promise.all(interviews.map(async (value) => {
        const ob = await getUserDetails(value.interviewerID);
        value.interviewerName = ob.name;
        //console.log(value);
        return value
    }));

    console.log(interviews);

    return res.status(200).json({"data": interviews});    
})



app.post("/acceptRequest", validateAccessToken, async (req, res) => {
    if(req.user.isTA){
        return res.status(401).json({});
    }

    const { _id, interviewerID, taID, time } = req.body;
    
    const db = getDB();
    const collection = db.collection("requests");
    
    try{
        await collection.deleteOne({"_id": ObjectId(_id)}).toArray();
    }catch(error){
        console.log(error);
    }

    const collection2 = db.collection("accepted");
    try{
        await collection2.insertOne({"interviewerID": interviewerID, "taID": taID, "time": time});
    }catch(error){
        console.log(error);
    }
    
    return res.status(200).json({message: "success"}); 
})


app.post("/rejectRequest", validateAccessToken, async (req, res) => {
    if(req.user.isTA){
        return res.status(401).json({});
    }

    const { _id, interviewerID, taID, time } = req.body;
    
    const db = getDB();
    const collection = db.collection("requests");
    
    try{
        await collection.deleteOne({"_id": ObjectId(_id)});
    }catch(error){
        console.log(error);
    }
    
    return res.status(200).json({message: "success"}); 
})



app.post("/rescheduleInterview", validateAccessToken, async (req, res) => {
    const { _id, time } = req.body;
    const db = getDB();
    const collection = db.collection("accepted");

    try{
        await collection.updateOne({"_id": ObjectId(_id)}, {"$set": {"time": time}});
    }catch(error){
        console.log(error);
    }

    return res.status(200).json({message: "success"}); 
})


app.post("/registerUser", async (req, res) => {

    const { name, username, password, isTA } = req.body;


    const db = getDB();
    const collection = db.collection("users");

    try{
        let user = await collection.findOne({"username": username});
        if(user){
            return res.status(403).json({"errorMsg": "User already exists"});
        }

        user = {
            name, 
            username, 
            password,
            isTA
        };

        await collection.insertOne(user);

    }catch(error){
        console.log(error);
    }

    return res.status(202).json({"message": "success"});
})



app.get("/getUsername", validateAccessToken, async (req, res) => {
    console.log(req.user);
    const ob = await getUserDetails(req.user._id);
    res.status(200).json(ob);
})


app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
