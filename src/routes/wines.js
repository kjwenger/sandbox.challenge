const wineService = require('../services/wineService');
const {
  validateWine,
  buildValidationError,
  buildUnknownObjectError
} = require('../validators/wineValidator');

function registerRoutes(server) {
  server.get('/wines/', async (req, res) => {
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
      res.send(500, { error: error.message });
    }
  });

  server.post('/wines/', async (req, res) => {
    try {
      const { isValid, errors } = validateWine(req.body);
      if (!isValid) {
        res.send(400, buildValidationError(errors));
        return;
      }
      const wine = await wineService.create(req.body);
      res.send(200, wine);
    } catch (error) {
      res.send(500, { error: error.message });
    }
  });

  server.get('/wines/:id', async (req, res) => {
    try {
      const wine = await wineService.findById(req.params.id);
      if (!wine) {
        res.send(400, buildUnknownObjectError());
        return;
      }
      res.send(200, wine);
    } catch (error) {
      res.send(500, { error: error.message });
    }
  });

  server.put('/wines/:id', async (req, res) => {
    try {
      const existing = await wineService.findById(req.params.id);
      if (!existing) {
        res.send(400, buildUnknownObjectError());
        return;
      }

      const { isValid, errors } = validateWine(req.body, true);
      if (!isValid) {
        res.send(400, buildValidationError(errors));
        return;
      }

      const wine = await wineService.update(req.params.id, req.body);
      res.send(200, wine);
    } catch (error) {
      res.send(500, { error: error.message });
    }
  });

  server.del('/wines/:id', async (req, res) => {
    try {
      const deleted = await wineService.remove(req.params.id);
      if (!deleted) {
        res.send(400, buildUnknownObjectError());
        return;
      }
      res.send(200, { success: true });
    } catch (error) {
      res.send(500, { error: error.message });
    }
  });
}

module.exports = { registerRoutes };
