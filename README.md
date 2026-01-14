# Wine API

[![CI/CD](https://github.com/kjwenger/sandbox.challenge/actions/workflows/ci.yml/badge.svg?branch=claude)](https://github.com/kjwenger/sandbox.challenge/actions/workflows/ci.yml)
[![Tests](https://kjwenger.github.io/sandbox.challenge/badges/tests.svg)](https://kjwenger.github.io/sandbox.challenge/test/test-report.html)
[![Coverage](https://kjwenger.github.io/sandbox.challenge/badges/coverage.svg)](https://kjwenger.github.io/sandbox.challenge/coverage/)
[![Reports](https://img.shields.io/badge/reports-GitHub%20Pages-blue)](https://kjwenger.github.io/sandbox.challenge/)
[![Demo](https://img.shields.io/badge/demo-Interactive-e94560)](https://kjwenger.github.io/sandbox.challenge/demo/)

RESTful API for managing wines, built with NodeJS, Restify, and MongoDB.

Based on the [Developer Challenge](CHALLENGE.md) specification.

## Quick Start

```bash
npm install
npm start
```

Server runs on port 3210 by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /wines/ | List all wines (with optional filters) |
| POST | /wines/ | Create a new wine |
| GET | /wines/:id | Get wine by ID |
| PUT | /wines/:id | Update wine by ID |
| DELETE | /wines/:id | Delete wine by ID |

### Query Filters (GET /wines/)

- `year` - Filter by year (exact match)
- `name` - Filter by name (case-insensitive partial match)
- `type` - Filter by type: `red`, `white`, `rose`
- `country` - Filter by country (exact match)

### Wine Object

```json
{
  "id": 1,
  "name": "Pinot noir",
  "year": 2011,
  "country": "France",
  "type": "red",
  "description": "Sensual and understated"
}
```

### Validation

Required fields: `name`, `year`, `country`, `type`

Valid types: `red`, `white`, `rose`

### Error Responses

**Validation Error (400)**
```json
{
  "error": "VALIDATION_ERROR",
  "validation": {
    "name": "MISSING",
    "type": "INVALID"
  }
}
```

**Unknown Object (400)**
```json
{
  "error": "UNKNOWN_OBJECT"
}
```

## Development

```bash
npm test              # Run tests
npm run test:report   # Generate HTML test report
npm run test:coverage # Generate coverage report
npm run test:all      # Generate both reports
npm run demo          # Generate interactive demo
npm run lint          # Run ESLint
```

## Documentation

- [Interactive Demo](https://kjwenger.github.io/sandbox.challenge/demo/) - Animated API walkthrough for product managers
- [Swagger UI](http://localhost:3210/api-docs) - Interactive API documentation (when server is running)
- [Test Report](https://kjwenger.github.io/sandbox.challenge/test/test-report.html) - Detailed test results
- [Coverage Report](https://kjwenger.github.io/sandbox.challenge/coverage/) - Code coverage analysis

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3210 | Server port |
| MONGODB_URI | mongodb://localhost:27017/wines | MongoDB connection |
| NODE_ENV | development | Environment |

## Tech Stack

- NodeJS
- Restify
- MongoDB / Mongoose
- Mocha / Chai / Supertest
- nyc (Istanbul) for coverage
- Mochawesome for test reports
