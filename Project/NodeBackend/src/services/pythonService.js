const { spawn } = require('child_process');

class PythonService {
    constructor(logger, config) {
        this.logger = logger;
        this.config = config;
        this.pendingJobs = [];
        this.startPythonWorker();
    }

    startPythonWorker() {
        this.pythonProcess = spawn('python', [
            this.config.python_script,
            this.config.haarcascade.face,
            this.config.haarcascade.eye,
            this.config.shape_predictor.dat,
            this.config.model.path
        ]);

        this.pythonProcess.stdout.on('data', (data) => {
            const resultString = data.toString().trim();
            this.logger.info(`Python response: ${resultString}`);

            try {
                const result = JSON.parse(resultString); // Expecting [0.1, 0.7, 0.1, 0.1]
                const { resolve } = this.pendingJobs.shift();
                resolve(result);
            } catch (err) {
                const { reject } = this.pendingJobs.shift();
                reject(new Error(`Failed to parse Python response: ${resultString}`));
            }
        });

        this.pythonProcess.stderr.on('data', (error) => {
            const { reject } = this.pendingJobs.shift() || {};
            if (reject) {
                reject(new Error(error.toString()));
            }
            this.logger.error(`Python error: ${error.toString()}`);
        });

        this.pythonProcess.on('exit', (code) => {
            this.logger.error(`Python process exited with code ${code}`);
        });
    }

    sendFrameJob(framePath) {
        return new Promise((resolve, reject) => {
            this.pendingJobs.push({ resolve, reject });

            const message = `${framePath}\n`; // Just send the framePath, Python knows what to do
            this.pythonProcess.stdin.write(message);
        });
    }
}

module.exports = PythonService;