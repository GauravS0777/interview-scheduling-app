const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { getDB } = require("../connection");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // find user
    let user;

    const db = getDB();
    const collection = db.collection("users");

    try{
        user = await collection.findOne({ username: username });
    }catch(err){
        res.json(err);
    }

    if(!user) return res.status(401).json({ error: "User doesn't exist." });
    
    // validate password
    if(user.password !== password) return res.status(401).json({ error: "Invalid password." });
    
    // create access and refresh tokens
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });  // m => minutes, h => hours
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    
    // create token
    const tokenCollection = db.collection("tokens"); 
    try{
        await tokenCollection.insertOne({ token: refreshToken });
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    }catch(err){
        return res.json(err);
    }
});

module.exports = router;

