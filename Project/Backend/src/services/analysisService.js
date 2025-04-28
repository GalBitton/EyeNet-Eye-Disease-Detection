const path = require('path');
const fs = require('fs');
const helper = require('../utils/helper');

class AnalysisService {
    constructor(logger,pythonService) {
        this.logger = logger;
        this.pythonService = pythonService; // Use the persistent PythonService instance
        this.sessionData = {}; // sessionId -> { average: [...], count: 0 }
    }

    async processFrame(frameBase64, sessionId, isCropped = false) {
        const tempImagePath = path.join(__dirname, '..', '..', 'temp', `${sessionId}_${Date.now()}.jpg`);
        const imageData = frameBase64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageData, 'base64');
        fs.mkdirSync(path.dirname(tempImagePath), { recursive: true });
        fs.writeFileSync(tempImagePath, buffer);

        try {
            const prediction = await this.pythonService.sendFrameJob(tempImagePath, isCropped);

            if (isCropped) {
                // 📸 Single image case: Return the raw model prediction without averaging
                return prediction.prediction;
            } else {
                // 🎥 Video case: Update rolling average
                const currentData = this.sessionData[sessionId] || { average: [0, 0, 0, 0], count: 0 };
                if (!prediction || !prediction.prediction) {
                    throw new Error('Invalid prediction from Python service');
                }
                const newAverage = require('../utils/helper').updateRollingAverageMultiClass(currentData.average, prediction.prediction);

                this.sessionData[sessionId] = {
                    average: newAverage,
                    count: currentData.count + 1
                };

                return newAverage;
            }

        } catch (error) {
            this.logger.error('Error in AnalysisService:', error);
            throw error;
        } finally {
            fs.unlinkSync(tempImagePath);
        }
    }
}

module.exports = AnalysisService;