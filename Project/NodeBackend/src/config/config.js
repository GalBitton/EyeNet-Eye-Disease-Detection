const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    python_script: './python_worker/predict.py',
    root:
        process.env.ROOT_URL || `http://localhost:${process.env.PORT || 8080}`,
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_CONSOLE === 'true',
        file: process.env.LOG_FILE === 'true',
        filepath: process.env.LOG_FILE_PATH || '../logs/app.log',
    },
    haarcascade: {
        face: './assets/cascades/haarcascade_frontalface_default.xml',
        eye: './assets/cascades/haarcascade_eye.xml',
    },
    shape_predictor: {
        dat: './assets/models/shape_predictor_68_face_landmarks.dat',
    },
    model:{
        path: './assets/models/eyenet_model_multi_classification.h5',
    }
};

module.exports = config;
