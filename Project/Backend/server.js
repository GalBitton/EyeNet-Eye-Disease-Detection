const app = require('./app');
const container = require('./src/container/container');

const config = container.get('config');
const logger = container.get('logger');


const server = app.listen(config.port, () =>{
    logger.info(
        `Server: Server is running in mode ${config.env} on port ${config.port}`
    );
    logger.info(`Server: Root url is available at ${config.root}`);
    logger.info(
        `Server: Swagger documentation is available at ${config.root}/api-docs`
    );
});

// Handle unexpected exceptions
process.on('uncaughtException', err => {
    logger.error('Server: Uncaught Exception!!! Server is going down');
    logger.error(err.name, err.message);
    server.close(async () => {
        process.exit(1);
    });
});

// Handle unhandled rejections
process.on('unhandledRejection', err => {
    logger.error('Server: Unhandled Rejection!!! Shutting down...');
    logger.error(err.name, err.message);
    server.close(async () => {
        process.exit(1);
    });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
    logger.info('Server: SIGTERM signal received: closing HTTP server');
    server.close(async () => {
        logger.info('HTTP server closed, Server terminated...');
    });
});