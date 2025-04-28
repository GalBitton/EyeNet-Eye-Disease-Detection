const Container = require('kontainer-di');
const config = require('../config/config');
const Logger = require('../utils/logger');

// Register common dependencies for all environments
Container.register('config',[],config);
Container.register('logger', [], Logger);

// Register Controllers and Services
Container.register('pythonService', ['logger','config'], require('../services/pythonService'));
Container.register('analysisService', ['logger','pythonService'], require('../services/analysisService'));
Container.register('analysisController', ['analysisService', 'logger'], require('../controllers/analysisController'));


module.exports = Container;