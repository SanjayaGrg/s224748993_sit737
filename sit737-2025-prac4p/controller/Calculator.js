const { info } = require('winston');
const logger = require('../logger');

const addNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        if (isNaN(num1)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num1 incorrectly defined');
        }
        if (isNaN(num2)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num2 incorrectly defined');
        }
        if (num1 === NaN || num2 === NaN) {
            console.log();
            throw new Error("Parsing Error");
        }
        logger.log({
            level: 'info',
            message: 'Parameters ' + num1 + ' and ' + num2 + ' received for addition'
        });

        const result = num1 + num2;
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Added !!!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });

    }
}

const subNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        if (isNaN(num1)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num1 incorrectly defined');
        }
        if (isNaN(num2)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num2 incorrectly defined');
        }
        if (num1 === NaN || num2 === NaN) {
            console.log();
            throw new Error("Parsing Error");
        }
        logger.log({
            level: 'info',
            message: 'Parameters ' + num1 + ' and ' + num2 + ' received for subtraction'
        });

        const result = num1 - num2;
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Subtracted !!!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });

    }
}
const multiplyNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        if (isNaN(num1)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num1 incorrectly defined');
        }
        if (isNaN(num2)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num2 incorrectly defined');
        }
        if (num1 === NaN || num2 === NaN) {
            console.log();
            throw new Error("Parsing Error");
        }
        logger.log({
            level: 'info',
            message: 'Parameters ' + num1 + ' and ' + num2 + ' received for multiplication'
        });

        const result = num1 * num2;
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Multiplied !!!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });

    }
}
const divNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        if (isNaN(num1)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num1 incorrectly defined');
        }
        if (isNaN(num2)) {
            logger.error('num1 incorrectly defined');
            throw new Error('num2 incorrectly defined');
        }
        if (num1 === NaN || num2 === NaN) {
            console.log();
            throw new Error("Parsing Error");
        }
        logger.log({
            level: 'info',
            message: 'Parameters ' + num1 + ' and ' + num2 + ' received for division'
        });

        const result = num1 / num2;
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Divided !!!" });
    } catch (error) {
        console.log(error);
        logger.error(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
}

// Advanced Arithmetic Operations
// Exponentiation
const powerNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1); //num1 acts as a base
        const num2 = parseFloat(req.query.num2); // num2 acts as a exponent
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input: Please provide valid numbers');
        }
        logger.info(`Exponentiation requested: ${num1} ^ ${num2}`);
        const result = Math.pow(num1, num2)
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Calculated Power!" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
};

// Square root formula
const sqrtNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        if (isNaN(num1) || num1 < 0) {
            throw new Error('Invalid input: Please provide a non-negative number');
        }
        logger.info(`Square Root requested: sqrt(${num1})`);
        const result = Math.sqrt(num1);
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Calculated Square Root!" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
};


// modulo operation
const modNum = (req, res) => {
    try {
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error('Invalid input: Please provide valid numbers');
        }
        logger.info(`Modulo requested: ${num1} % ${num2}`);
        const result = num1 % num2;
        res.status(200).json({ statuscode: 200, data: result, msg: "Successfully Calculated Modulo!" });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({ statuscode: 500, msg: error.message });
    }
};


module.exports = { addNum, subNum, multiplyNum, divNum, powerNum, sqrtNum, modNum };