require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3210,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/wines',
  nodeEnv: process.env.NODE_ENV || 'development'
};
