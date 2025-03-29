const express = require('express');
const winston = require('winston');
const path = require('path');
const app = express();
const port = 3000;

// logging using winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return { error: 'Invalid input: num1 and num2 must be valid numbers.' };
    }
    return null;
};

app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    const result = num1 + num2;
    logger.info(`Addition operation: ${num1} + ${num2} = ${result}`);
    res.json({ result });
});

app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    const result = num1 - num2;
    logger.info(`Subtraction operation: ${num1} - ${num2} = ${result}`);
    res.json({ result });
});

app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    const result = num1 * num2;
    logger.info(`Multiplication operation: ${num1} * ${num2} = ${result}`);
    res.json({ result });
});

app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    if (num2 === 0) {
        logger.error('Division by zero error');
        return res.status(400).json({ error: 'Cannot divide by zero.' });
    }
    const result = num1 / num2;
    logger.info(`Division operation: ${num1} / ${num2} = ${result}`);
    res.json({ result });
});

app.listen(port, () => {
    logger.info(`Calculator microservice running at http://localhost:${port}`);
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
