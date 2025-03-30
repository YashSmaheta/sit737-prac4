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

const validateNumbers = (num1, num2 = null) => {
    if (isNaN(num1) || (num2 !== null && isNaN(num2))) {
        return { error: 'Invalid input: Numbers must be valid.' };
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

app.get('/power', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    const result = Math.pow(num1, num2);
    logger.info(`Exponentiation: ${num1}^${num2} = ${result}`);
    res.json({ result });
});

app.get('/sqrt', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    if (isNaN(num1) || num1 < 0) {
        logger.error('Invalid input for square root operation.');
        return res.status(400).json({ error: 'Invalid input: Cannot compute square root of negative numbers.' });
    }
    const result = Math.sqrt(num1);
    logger.info(`Square Root: √${num1} = ${result}`);
    res.json({ result });
});

app.get('/modulo', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const validationError = validateNumbers(num1, num2);
    if (validationError) {
        logger.error(validationError.error);
        return res.status(400).json(validationError);
    }
    if (num2 === 0) {
        logger.error('Modulo by zero error');
        return res.status(400).json({ error: 'Cannot calculate modulo with divisor zero.' });
    }
    const result = num1 % num2;
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
    res.json({ result });
});
app.listen(port, () => {
    logger.info(`Calculator microservice running at http://localhost:${port}`);
    console.log(`Calculator microservice running at http://localhost:${port}`);
});
