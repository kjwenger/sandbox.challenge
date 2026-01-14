# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RESTful API for managing wines, implemented in NodeJS with Restify framework and MongoDB.

## Build and Run Commands

```bash
npm install                              # Install dependencies
npm start                                # Start the server
npm test                                 # Run all tests
npm test -- --grep "should create"       # Run single test by name
npm run lint                             # Run ESLint
```

## API Specification

All responses are JSON with UTF-8 encoding. Dates use unix timestamps.

### Endpoints

- `GET /wines/` - List wines (optional filters: year, name, type, country)
- `POST /wines/` - Create wine (requires: name, year, country, type)
- `GET /wines/:id` - Get wine by ID
- `PUT /wines/:id` - Update wine by ID
- `DELETE /wines/:id` - Delete wine by ID

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

- `name`, `year`, `country`, `type` are mandatory
- Valid types: `red`, `white`, `rose`
- Invalid requests return 400 with `VALIDATION_ERROR`
- Unknown IDs return 400 with `UNKNOWN_OBJECT`

## Tech Stack

- NodeJS with Restify framework
- MongoDB for data storage
- ESLint for code verification
- Environment variables for configuration (12-factor app)
