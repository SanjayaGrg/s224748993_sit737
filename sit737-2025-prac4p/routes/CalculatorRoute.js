const express = require('express');
const logger = require('../logger');
const router = express.Router();
let controller = require("../controller/Calculator");

router.get('/add', (req, res) => {
    controller.addNum(req, res);
});
router.get('/subtract', (req, res) => {
    controller.subNum(req, res);
});
router.get('/multiply', (req, res) => {
    controller.multiplyNum(req, res);
});
router.get('/divide', (req, res) => {
    controller.divNum(req, res);
});
router.get('/power', (req, res) => {
    controller.powerNum(req, res);
});
router.get('/squareroot', (req, res) => {
    controller.sqrtNum(req, res);
});
router.get('/modulo', (req, res) => {
    controller.modNum(req, res);
});

module.exports = router;
