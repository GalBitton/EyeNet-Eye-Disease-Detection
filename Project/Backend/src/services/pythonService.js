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
            this.config.model.path,
            this.config.haarcascade.face,
            this.config.haarcascade.eye,
            this.config.shape_predictor.dat,

        ]);

        this.pythonProcess.stdout.on('data', (data) => {
            const lines = data.toString().trim().split('\n');

            for (const line of lines) {
                const resultString = line.trim();
                this.logger.info(`Python response: ${resultString}`);

                let parsedResult;
                try {
                    parsedResult = JSON.parse(resultString);
                } catch (err) {
                    // Not a JSON (probably TensorFlow log), ignore safely
                    continue;
                }

                const pendingJob = this.pendingJobs.shift();
                if (!pendingJob) {
                    this.logger.error('No pending job to resolve');
                    return;
                }

                pendingJob.resolve(parsedResult);
            }
        });

        this.pythonProcess.stderr.on('data', (error) => {
            const errorMsg = error.toString();
            this.logger.error(`Python error: ${errorMsg}`);

            // Ignore TensorFlow INFO or WARNING logs
            if (errorMsg.includes('tensorflow') || errorMsg.includes('oneDNN') || errorMsg.includes('cuDNN') || errorMsg.includes('GPU')) {
                return; // Just a harmless info log, do NOT shift pending jobs!
            }

            const pendingJob = this.pendingJobs.shift();
            if (pendingJob && pendingJob.reject) {
                pendingJob.reject(new Error(errorMsg));
            }
        });
    }

    sendFrameJob(framePath, isCropped = false) {
        return new Promise((resolve, reject) => {
            this.pendingJobs.push({ resolve, reject });
            const message = isCropped ? `${framePath},cropped\n` : `${framePath}\n`;
            this.pythonProcess.stdin.write(message);
        });
    }
}

module.exports = PythonService;