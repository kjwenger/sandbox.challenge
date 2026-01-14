# Implementation Tasks

## Phase 1: Project Setup

- [ ] Initialize npm project with `package.json`
- [ ] Install production dependencies (restify, mongoose, dotenv)
- [ ] Install dev dependencies (eslint, mocha, chai, supertest)
- [ ] Create `.env.example` with required variables
- [ ] Configure ESLint with standard rules
- [ ] Add npm scripts: start, test, lint

## Phase 2: Database Layer

- [ ] Create MongoDB connection module with retry logic
- [ ] Define Wine Mongoose schema with validation
- [ ] Implement counter collection for sequential IDs
- [ ] Create `getNextId()` helper function

## Phase 3: Server Setup

- [ ] Create Restify server with JSON body parser
- [ ] Configure CORS if needed
- [ ] Add request logging middleware
- [ ] Create config module reading from environment

## Phase 4: Wine Service

- [ ] Implement `findAll(filters)` - list with optional filtering
- [ ] Implement `findById(id)` - get single wine
- [ ] Implement `create(data)` - create with ID generation
- [ ] Implement `update(id, data)` - partial update
- [ ] Implement `remove(id)` - delete wine

## Phase 5: Validation

- [ ] Create validation helper for required fields
- [ ] Validate `type` enum (red, white, rose)
- [ ] Validate `year` is positive integer
- [ ] Build validation error response format

## Phase 6: Route Handlers

- [ ] `GET /wines/` - parse query params, call service, return array
- [ ] `POST /wines/` - validate body, create wine, return object
- [ ] `GET /wines/:id` - find by ID or return UNKNOWN_OBJECT
- [ ] `PUT /wines/:id` - validate, update or return UNKNOWN_OBJECT
- [ ] `DELETE /wines/:id` - delete or return UNKNOWN_OBJECT

## Phase 7: Testing

- [ ] Setup test database connection
- [ ] Create test fixtures with sample wines
- [ ] Test GET /wines/ returns list
- [ ] Test GET /wines/ with each filter (year, name, type, country)
- [ ] Test POST /wines/ creates wine with correct response
- [ ] Test POST /wines/ validation errors
- [ ] Test GET /wines/:id returns wine
- [ ] Test GET /wines/:id with unknown ID
- [ ] Test PUT /wines/:id updates wine
- [ ] Test PUT /wines/:id with unknown ID
- [ ] Test DELETE /wines/:id removes wine
- [ ] Test DELETE /wines/:id with unknown ID

## Phase 8: Finalization

- [ ] Run ESLint and fix any issues
- [ ] Verify all tests pass
- [ ] Create Procfile for Heroku
- [ ] Test local deployment
- [ ] Update CLAUDE.md with final commands
