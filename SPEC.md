# Technical Specification

## Architecture

```
src/
├── index.js              # Application entry point
├── config.js             # Environment configuration
├── server.js             # Restify server setup
├── routes/
│   └── wines.js          # Wine route handlers
├── models/
│   └── wine.js           # Wine Mongoose model
├── services/
│   └── wineService.js    # Business logic layer
├── validators/
│   └── wineValidator.js  # Input validation
└── db/
    └── connection.js     # MongoDB connection
test/
├── wines.test.js         # API integration tests
└── fixtures/
    └── wines.js          # Test data
```

## Dependencies

### Production
- `restify` - REST API framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable loading

### Development
- `eslint` - Code linting
- `mocha` - Test framework
- `chai` - Assertion library
- `supertest` - HTTP testing

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/wines |
| `NODE_ENV` | Environment (development/production/test) | development |

## Data Model

### Wine Schema

```javascript
{
  id: Number,           // Auto-incremented
  name: String,         // Required, trimmed
  year: Number,         // Required, integer
  country: String,      // Required, trimmed
  type: String,         // Required, enum: ['red', 'white', 'rose']
  description: String   // Optional
}
```

## API Routes

### GET /wines/
- Query params: `year`, `name`, `type`, `country` (all optional)
- Partial matching for `name` (case-insensitive)
- Exact matching for `year`, `type`, `country`
- Returns: Array of wine objects

### POST /wines/
- Body: `{ name, year, country, type, description? }`
- Validates required fields and type enum
- Auto-generates sequential `id`
- Returns: Created wine object

### GET /wines/:id
- Returns: Single wine object or `UNKNOWN_OBJECT` error

### PUT /wines/:id
- Body: Fields to update
- Returns: Updated wine object or `UNKNOWN_OBJECT` error

### DELETE /wines/:id
- Returns: `{ success: true }` or `UNKNOWN_OBJECT` error

## Error Responses

### Validation Error (400)
```json
{
  "error": "VALIDATION_ERROR",
  "validation": {
    "fieldName": "MISSING" | "INVALID"
  }
}
```

### Unknown Object (400)
```json
{
  "error": "UNKNOWN_OBJECT"
}
```

## Validation Rules

| Field | Rule |
|-------|------|
| `name` | Required, non-empty string |
| `year` | Required, positive integer |
| `country` | Required, non-empty string |
| `type` | Required, one of: `red`, `white`, `rose` |
| `description` | Optional string |

## ID Generation

Use a MongoDB counter collection to generate sequential IDs:
```javascript
// counters collection
{ _id: "wines", seq: 0 }
```
Increment atomically on each POST to ensure unique sequential IDs.
