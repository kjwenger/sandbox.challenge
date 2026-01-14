const fs = require('fs');
const path = require('path');

function registerRoutes(server) {
  const openapiSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../openapi.json'), 'utf8')
  );

  server.get('/api-docs/openapi.json', async (req, res) => {
    res.send(200, openapiSpec);
  });

  server.get('/api-docs', async (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendRaw(200, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wine API - Documentation</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
  <style>
    body { margin: 0; padding: 0; }
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 20px 0; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api-docs/openapi.json',
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
      tryItOutEnabled: true,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1
    });
  </script>
</body>
</html>`);
  });
}

module.exports = { registerRoutes };
