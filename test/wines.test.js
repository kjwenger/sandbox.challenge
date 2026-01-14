const { expect } = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const { createServer } = require('../src/server');
const Wine = require('../src/models/wine');
const { Counter } = require('../src/models/counter');
const { sampleWines } = require('./fixtures/wines');

describe('Wine API', function() {
  let server;

  before(async function() {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wines_test';
    await mongoose.connect(mongoUri);
    server = createServer();
  });

  after(async function() {
    await mongoose.disconnect();
  });

  beforeEach(async function() {
    await Wine.deleteMany({});
    await Counter.deleteMany({});
  });

  describe('GET /wines/', function() {
    it('should return empty array when no wines exist', async function() {
      const res = await request(server).get('/wines/');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });

    it('should return all wines', async function() {
      await Wine.create([
        { id: 1, ...sampleWines[0] },
        { id: 2, ...sampleWines[1] }
      ]);

      const res = await request(server).get('/wines/');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.length(2);
    });

    it('should filter by year', async function() {
      await Wine.create([
        { id: 1, ...sampleWines[0] },
        { id: 2, ...sampleWines[1] }
      ]);

      const res = await request(server).get('/wines/').query({ year: 2011 });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.length(1);
      expect(res.body[0].name).to.equal('Pinot noir');
    });

    it('should filter by name (case-insensitive)', async function() {
      await Wine.create([
        { id: 1, ...sampleWines[0] },
        { id: 2, ...sampleWines[1] }
      ]);

      const res = await request(server).get('/wines/').query({ name: 'pinot' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.length(1);
      expect(res.body[0].name).to.equal('Pinot noir');
    });

    it('should filter by type', async function() {
      await Wine.create([
        { id: 1, ...sampleWines[0] },
        { id: 2, ...sampleWines[2] }
      ]);

      const res = await request(server).get('/wines/').query({ type: 'white' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.length(1);
      expect(res.body[0].name).to.equal('Chardonnay');
    });

    it('should filter by country', async function() {
      await Wine.create([
        { id: 1, ...sampleWines[0] },
        { id: 2, ...sampleWines[2] }
      ]);

      const res = await request(server).get('/wines/').query({ country: 'France' });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.length(1);
      expect(res.body[0].name).to.equal('Pinot noir');
    });
  });

  describe('POST /wines/', function() {
    it('should create a wine with valid data', async function() {
      const res = await request(server)
        .post('/wines/')
        .send(sampleWines[0]);

      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(1);
      expect(res.body.name).to.equal('Pinot noir');
      expect(res.body.year).to.equal(2011);
      expect(res.body.country).to.equal('France');
      expect(res.body.type).to.equal('red');
    });

    it('should auto-increment IDs', async function() {
      await request(server).post('/wines/').send(sampleWines[0]);
      const res = await request(server).post('/wines/').send(sampleWines[1]);

      expect(res.body.id).to.equal(2);
    });

    it('should return validation error for missing name', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ year: 2011, country: 'France', type: 'red' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.name).to.equal('MISSING');
    });

    it('should return validation error for missing year', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ name: 'Test', country: 'France', type: 'red' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.year).to.equal('MISSING');
    });

    it('should return validation error for invalid year', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ name: 'Test', year: 'invalid', country: 'France', type: 'red' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.year).to.equal('INVALID');
    });

    it('should return validation error for missing country', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ name: 'Test', year: 2011, type: 'red' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.country).to.equal('MISSING');
    });

    it('should return validation error for missing type', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ name: 'Test', year: 2011, country: 'France' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.type).to.equal('MISSING');
    });

    it('should return validation error for invalid type', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ name: 'Test', year: 2011, country: 'France', type: 'sparkling' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.type).to.equal('INVALID');
    });

    it('should return multiple validation errors', async function() {
      const res = await request(server)
        .post('/wines/')
        .send({ year: 'invalid' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.name).to.equal('MISSING');
      expect(res.body.validation.year).to.equal('INVALID');
      expect(res.body.validation.country).to.equal('MISSING');
      expect(res.body.validation.type).to.equal('MISSING');
    });
  });

  describe('GET /wines/:id', function() {
    it('should return wine by id', async function() {
      await Wine.create({ id: 1, ...sampleWines[0] });

      const res = await request(server).get('/wines/1');
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(1);
      expect(res.body.name).to.equal('Pinot noir');
    });

    it('should return UNKNOWN_OBJECT for non-existent id', async function() {
      const res = await request(server).get('/wines/999');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('UNKNOWN_OBJECT');
    });
  });

  describe('PUT /wines/:id', function() {
    it('should update wine', async function() {
      await Wine.create({ id: 1, ...sampleWines[0] });

      const res = await request(server)
        .put('/wines/1')
        .send({ description: 'Updated description' });

      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(1);
      expect(res.body.description).to.equal('Updated description');
    });

    it('should update multiple fields', async function() {
      await Wine.create({ id: 1, ...sampleWines[0] });

      const res = await request(server)
        .put('/wines/1')
        .send({ year: 2012, country: 'Italy' });

      expect(res.status).to.equal(200);
      expect(res.body.year).to.equal(2012);
      expect(res.body.country).to.equal('Italy');
    });

    it('should return UNKNOWN_OBJECT for non-existent id', async function() {
      const res = await request(server)
        .put('/wines/999')
        .send({ description: 'Test' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('UNKNOWN_OBJECT');
    });

    it('should validate updated fields', async function() {
      await Wine.create({ id: 1, ...sampleWines[0] });

      const res = await request(server)
        .put('/wines/1')
        .send({ type: 'sparkling' });

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('VALIDATION_ERROR');
      expect(res.body.validation.type).to.equal('INVALID');
    });
  });

  describe('DELETE /wines/:id', function() {
    it('should delete wine', async function() {
      await Wine.create({ id: 1, ...sampleWines[0] });

      const res = await request(server).delete('/wines/1');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);

      const wine = await Wine.findOne({ id: 1 });
      expect(wine).to.be.null;
    });

    it('should return UNKNOWN_OBJECT for non-existent id', async function() {
      const res = await request(server).delete('/wines/999');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('UNKNOWN_OBJECT');
    });
  });
});
