const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

app.use(express.static(__dirname + '/public'));
app.use(express.json());

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const winston = require("winston");
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
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

// Conversion logic
const convertUnits = (value, unitFrom, unitTo) => {
    let convertedValue;

    // Conversion logic for meters and kilometers
    if (unitFrom === 'meters' && unitTo === 'kilometers') {
        convertedValue = value / 1000;
        logger.info(convertedValue + 'converted to kilometer.')
    } else if (unitFrom === 'kilometers' && unitTo === 'meters') {
        convertedValue = value * 1000;
        logger.info(convertedValue + 'converted to meter.')
    }
    else if (unitFrom === 'meters' && unitTo === 'meters') {
        convertedValue = value;
    }
    else if (unitFrom === 'kilometers' && unitTo === 'kilometers') {
        convertedValue = value;
    }
    // Conversion logic for grams and kilograms
    else if (unitFrom === 'grams' && unitTo === 'kilograms') {
        convertedValue = value / 1000;
        logger.info(convertedValue + 'converted to kilograms.')
    } else if (unitFrom === 'kilograms' && unitTo === 'grams') {
        convertedValue = value * 1000;
        logger.info(convertedValue + 'converted to grams.')
    } else if (unitFrom === 'grams' && unitTo === 'grams') {
        convertedValue = value;
    } else if (unitFrom === 'kilograms' && unitTo === 'kilograms') {
        convertedValue = value;
    } else if (unitFrom === 'celsius' && unitTo === 'fahrenheit') {
        convertedValue = (value * 9 / 5) + 32;
        logger.info(convertedValue + ' converted to Fahrenheit.');
    } else {
        // If units are the same, no conversion needed
        // convertedValue = value;
        throw new Error("Please choose the correct unit for conversion.")
    }

    return convertedValue;
};


// API endpoint for conversions
app.post('/convert', (req, res) => {
    const { value, unitFrom, unitTo } = req.body;
    //checking if value is not numeric or less than or equal to zero
    if (isNaN(value) || value <= 0) {
        logger.error('Please enter a valid number greater than zero.');
        return res.status(400).json({ error: 'Please enter a valid number greater than zero.' });
    }
    try {
        const result = convertUnits(value, unitFrom, unitTo);
        res.json({ convertedValue: result });
    } catch (error) {
        // If there's an error in the conversion, send it to the frontend
        logger.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log("I am listing to port: " + port)
})