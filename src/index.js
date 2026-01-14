const config = require('./config');
const { connect } = require('./db/connection');
const { createServer } = require('./server');

async function main() {
  await connect();

  const server = createServer();

  server.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
