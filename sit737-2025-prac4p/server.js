const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const router = require("./routes/CalculatorRoute");
const logger = require('./logger');
const winston = require("winston"); //winston logger

app.use(express.static(__dirname + '/public'));
app.use(express.json()); //parsing json requests

app.use("/v1/calculate/", router);

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.listen(port, () => {
    logger.info("I am listening to port: " + port);
    console.log("I am listing to port: " + port);
})