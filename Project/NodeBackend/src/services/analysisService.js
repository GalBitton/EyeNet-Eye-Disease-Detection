const path = require('path');
const fs = require('fs');
const helper = require('../utils/helper');

class AnalysisService {
    constructor(logger,pythonService) {
        this.logger = logger;
        this.pythonService = pythonService; // Use the persistent PythonService instance
        this.sessionData = {}; // sessionId -> { average: [...], count: 0 }
    }

    async processFrame(frameBase64, sessionId) {
        // 1. Save the frame to temp file
        const tempImagePath = path.join(__dirname, '..', '..', 'temp', `${sessionId}_${Date.now()}.jpg`);
        const imageData = frameBase64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageData, 'base64');
        fs.mkdirSync(path.dirname(tempImagePath), { recursive: true });
        fs.writeFileSync(tempImagePath, buffer);

        try {
            // 2. Call the persistent Python worker
            const prediction = await this.pythonService.sendFrameJob(tempImagePath); // Now prediction is array [prob1, prob2, prob3, prob4]

            // 3. Update rolling average per session
            const currentData = this.sessionData[sessionId] || { average: [0, 0, 0, 0], count: 0 };
            const newAverage = helper.updateRollingAverageMultiClass(currentData.average, prediction);

            this.sessionData[sessionId] = {
                average: newAverage,
                count: currentData.count + 1
            };

            return newAverage; // Return updated smooth average

        } catch (error) {
            this.logger.error('Error in AnalysisService:', error);
            throw error;
        } finally {
            // 4. Clean up temp file
            fs.unlinkSync(tempImagePath);
        }
    }
}

module.exports = AnalysisService;