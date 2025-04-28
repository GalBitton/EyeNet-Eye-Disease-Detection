const Container = require('kontainer-di');
const config = require('../config/config');
const Logger = require('../utils/logger');

const PythonService = require('../services/pythonService');
const AnalysisService = require('../services/analysisService');
const AnalysisController = require('../controllers/analysisController');

// Register common dependencies for all environments
Container.register('config',[],config);
Container.register('logger', [], Logger);

// Register Controllers and Services
Container.register('pythonService', ['logger','config'], PythonService);
Container.register('analysisService', ['logger','pythonService'], AnalysisService);
Container.register('analysisController', ['analysisService', 'logger'], AnalysisController);

module.exports = Container;