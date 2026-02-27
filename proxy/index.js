const express = require("express");

const cors = require("cors");

const proxyController = require("./proxyController");

const app = express();

app.use(cors());

app.use("/", proxyController);

app.listen(5001, () => {
    console.log("Proxy server running on port 5001");
});