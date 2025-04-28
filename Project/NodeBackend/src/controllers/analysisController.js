
class AnalysisController{
    constructor(analysisService,logger){
        this.analysisService = analysisService;
        this.logger = logger;
    }

    async analyzeFrame(req,res,next){
        try{
            const {frameBase64, sessionId} = req.body;

            if (!frameBase64 || !sessionId) {
                return res.status(400).json({ error: 'Missing frame or sessionId' });
            }

            const result = await this.analysisService.processFrame(frameBase64, sessionId);
            res.json({ sessionId, prediction: result });
        }catch(error){
            next(error);
        }
    }
};

module.exports = AnalysisController;