const jwt = require("jsonwebtoken");
const { getDB } = require("./connection");

// middleware
const validateAccessToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken) return res.status(401).json({ error: "Access denied." });
    // validate token
    try{
        const { _id, isTA } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = { _id: _id, isTA: isTA };
        next();
    }catch(err){
        return res.status(401).json({ error: "Access denied." });
    }
}

const validateRefreshToken = async (req, res, next) => {
    const db = getDB();
    const collection = db.collection("tokens");

    const refreshToken = req.header("refresh-token");
    if(!refreshToken) return res.status(401).json({ error: "Access denied." });
    // Check if refresh-token present in database 
    try{
        const token = await collection.findOne({ token: refreshToken });
        if(!token) return res.status(401).json({ error: "Access denied." });
    }catch(err){
        return res.json(err);
    }
    // extract _id of the user
    try{
        const { _id, isTA } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = { _id: _id, isTA: isTA };
    }catch(err){
        return res.json(err);
    }
    next();
}

module.exports = { validateAccessToken, validateRefreshToken };