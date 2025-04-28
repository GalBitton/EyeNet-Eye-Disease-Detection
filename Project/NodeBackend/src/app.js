const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const httpStatusCode = require('http-status-codes');

const app = express();
const container = require('./container/container');
const analysisRoutes = require('./routes/analysisRoutes');
const logger = container.get('logger');

// Enable helmet for security - helps secure Express apps by setting various HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: false, // Add this to allow Swagger UI to work
    })
);

app.use(cors()); // Enable CORS for all routes - in order to allow cross-origin requests

app.use(express.json({limit:'50mb'}));

// // Add Swagger UI for API documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Defining a health check route
app.get('/health', (req, res) => {
    res.status(httpStatusCode.OK).json({ message: 'OK' });
});

// Enable URL-encoded data parsing
app.use(
    morgan('combined', {
        // Use combined format for logging
        stream: { write: message => logger.info(message.trim()) },
    })
);

// Defining a root route
app.get('/', (req, res) => {
    res.status(httpStatusCode.OK).json({ message: 'Welcome to the Analysis Service!' });
});

app.use('/v1', analysisRoutes);

// Defining a 404 error handler for unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Resource not found',
    });
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    logger.error(`Error: ${message}`);
    res.status(statusCode).json({ error: message });
});

module.exports = app;