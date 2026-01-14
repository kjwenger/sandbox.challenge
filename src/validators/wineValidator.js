const VALID_TYPES = ['red', 'white', 'rose'];

function validateWine(data, isUpdate = false) {
  const errors = {};

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.name = 'MISSING';
    }
  }

  if (!isUpdate || data.year !== undefined) {
    if (data.year === undefined || data.year === null || data.year === '') {
      errors.year = 'MISSING';
    } else if (!Number.isInteger(Number(data.year)) || Number(data.year) <= 0) {
      errors.year = 'INVALID';
    }
  }

  if (!isUpdate || data.country !== undefined) {
    if (!data.country || typeof data.country !== 'string' || data.country.trim() === '') {
      errors.country = 'MISSING';
    }
  }

  if (!isUpdate || data.type !== undefined) {
    if (!data.type || typeof data.type !== 'string' || data.type.trim() === '') {
      errors.type = 'MISSING';
    } else if (!VALID_TYPES.includes(data.type)) {
      errors.type = 'INVALID';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function buildValidationError(errors) {
  return {
    error: 'VALIDATION_ERROR',
    validation: errors
  };
}

function buildUnknownObjectError() {
  return {
    error: 'UNKNOWN_OBJECT'
  };
}

module.exports = {
  validateWine,
  buildValidationError,
  buildUnknownObjectError,
  VALID_TYPES
};
