const scenarios = [
  {
    title: 'List all wines (empty database)',
    description: 'Initially, the database is empty. GET /wines/ returns an empty array.',
    request: {
      method: 'GET',
      url: '/wines/',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: []
    }
  },
  {
    title: 'Create a red wine',
    description: 'POST /wines/ creates a new wine entry with auto-generated ID.',
    request: {
      method: 'POST',
      url: '/wines/',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Pinot noir',
        year: 2011,
        country: 'France',
        type: 'red',
        description: 'Sensual and understated'
      }
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: {
        id: 1,
        name: 'Pinot noir',
        year: 2011,
        country: 'France',
        type: 'red',
        description: 'Sensual and understated'
      }
    }
  },
  {
    title: 'Create a white wine',
    description: 'Create another wine - ID auto-increments to 2.',
    request: {
      method: 'POST',
      url: '/wines/',
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: 'Chardonnay',
        year: 2015,
        country: 'USA',
        type: 'white',
        description: 'Buttery and oaky'
      }
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: {
        id: 2,
        name: 'Chardonnay',
        year: 2015,
        country: 'USA',
        type: 'white',
        description: 'Buttery and oaky'
      }
    }
  },
  {
    title: 'List all wines',
    description: 'GET /wines/ now returns both wines.',
    request: {
      method: 'GET',
      url: '/wines/',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: [
        { id: 1, name: 'Pinot noir', year: 2011, country: 'France', type: 'red', description: 'Sensual and understated' },
        { id: 2, name: 'Chardonnay', year: 2015, country: 'USA', type: 'white', description: 'Buttery and oaky' }
      ]
    }
  },
  {
    title: 'Filter wines by type',
    description: 'GET /wines/?type=red returns only red wines.',
    request: {
      method: 'GET',
      url: '/wines/?type=red',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: [
        { id: 1, name: 'Pinot noir', year: 2011, country: 'France', type: 'red', description: 'Sensual and understated' }
      ]
    }
  },
  {
    title: 'Filter wines by name',
    description: 'GET /wines/?name=chard returns wines matching "chard" (case-insensitive).',
    request: {
      method: 'GET',
      url: '/wines/?name=chard',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: [
        { id: 2, name: 'Chardonnay', year: 2015, country: 'USA', type: 'white', description: 'Buttery and oaky' }
      ]
    }
  },
  {
    title: 'Get wine by ID',
    description: 'GET /wines/1 retrieves a specific wine.',
    request: {
      method: 'GET',
      url: '/wines/1',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: { id: 1, name: 'Pinot noir', year: 2011, country: 'France', type: 'red', description: 'Sensual and understated' }
    }
  },
  {
    title: 'Update wine description',
    description: 'PUT /wines/1 updates the wine description.',
    request: {
      method: 'PUT',
      url: '/wines/1',
      headers: { 'Content-Type': 'application/json' },
      body: { description: 'Complex and earthy' }
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: { id: 1, name: 'Pinot noir', year: 2011, country: 'France', type: 'red', description: 'Complex and earthy' }
    }
  },
  {
    title: 'Validation error - missing fields',
    description: 'POST /wines/ with missing required fields returns validation errors.',
    request: {
      method: 'POST',
      url: '/wines/',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Incomplete Wine' }
    },
    response: {
      status: 400,
      statusText: 'Bad Request',
      body: {
        error: 'VALIDATION_ERROR',
        validation: {
          year: 'MISSING',
          country: 'MISSING',
          type: 'MISSING'
        }
      }
    }
  },
  {
    title: 'Validation error - invalid type',
    description: 'POST /wines/ with invalid type returns validation error.',
    request: {
      method: 'POST',
      url: '/wines/',
      headers: { 'Content-Type': 'application/json' },
      body: { name: 'Sparkling', year: 2020, country: 'Italy', type: 'sparkling' }
    },
    response: {
      status: 400,
      statusText: 'Bad Request',
      body: {
        error: 'VALIDATION_ERROR',
        validation: { type: 'INVALID' }
      }
    }
  },
  {
    title: 'Delete wine',
    description: 'DELETE /wines/2 removes the wine.',
    request: {
      method: 'DELETE',
      url: '/wines/2',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 200,
      statusText: 'OK',
      body: { success: true }
    }
  },
  {
    title: 'Unknown object error',
    description: 'GET /wines/999 returns error for non-existent ID.',
    request: {
      method: 'GET',
      url: '/wines/999',
      headers: { 'Accept': 'application/json' },
      body: null
    },
    response: {
      status: 400,
      statusText: 'Bad Request',
      body: { error: 'UNKNOWN_OBJECT' }
    }
  }
];

module.exports = { scenarios };
