const wineService = require('../services/wineService');
const {
  validateWine,
  buildValidationError,
  buildUnknownObjectError
} = require('../validators/wineValidator');

function registerRoutes(server) {
  server.get('/wines/', async (req, res, next) => {
    try {
      const filters = {
        year: req.query.year,
        name: req.query.name,
        type: req.query.type,
        country: req.query.country
      };
      const wines = await wineService.findAll(filters);
      res.send(200, wines);
    } catch (error) {
      next(error);
    }
  });

  server.post('/wines/', async (req, res, next) => {
    try {
      const { isValid, errors } = validateWine(req.body);
      if (!isValid) {
        res.send(400, buildValidationError(errors));
        return next();
      }
      const wine = await wineService.create(req.body);
      res.send(200, wine);
    } catch (error) {
      next(error);
    }
  });

  server.get('/wines/:id', async (req, res, next) => {
    try {
      const wine = await wineService.findById(req.params.id);
      if (!wine) {
        res.send(400, buildUnknownObjectError());
        return next();
      }
      res.send(200, wine);
    } catch (error) {
      next(error);
    }
  });

  server.put('/wines/:id', async (req, res, next) => {
    try {
      const existing = await wineService.findById(req.params.id);
      if (!existing) {
        res.send(400, buildUnknownObjectError());
        return next();
      }

      const { isValid, errors } = validateWine(req.body, true);
      if (!isValid) {
        res.send(400, buildValidationError(errors));
        return next();
      }

      const wine = await wineService.update(req.params.id, req.body);
      res.send(200, wine);
    } catch (error) {
      next(error);
    }
  });

  server.del('/wines/:id', async (req, res, next) => {
    try {
      const deleted = await wineService.remove(req.params.id);
      if (!deleted) {
        res.send(400, buildUnknownObjectError());
        return next();
      }
      res.send(200, { success: true });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = { registerRoutes };
