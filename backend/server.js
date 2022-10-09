const express = require("Express");
const app = express();

app.get("/", (req, res) => {
    return res.send("Hello world!");
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
