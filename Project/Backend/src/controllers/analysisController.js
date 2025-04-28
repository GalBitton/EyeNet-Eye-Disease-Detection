class AnalysisController {
    constructor(analysisService, logger) {
        this.analysisService = analysisService;
        this.logger = logger;
    }

    async analyzeFrame(req, res, next) {
        try {
            const { frameBase64, sessionId, isCropped = false } = req.body;

            if (!frameBase64 || !sessionId) {
                return res.status(400).json({ error: 'Missing frameBase64 or sessionId' });
            }

            if (!frameBase64.startsWith('data:image/jpeg;base64,')) {
                return res.status(400).json({ error: 'Invalid frame format. Expected base64 JPEG.' });
            }

            const result = await this.analysisService.processFrame(frameBase64, sessionId, isCropped);
            res.json({ sessionId, prediction: result });
        } catch (error) {
            this.logger.error('Error in AnalysisController:', error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
}

module.exports = AnalysisController;