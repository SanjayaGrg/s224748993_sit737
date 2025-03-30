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

module.exports = { addNum, subNum, multiplyNum, divNum };