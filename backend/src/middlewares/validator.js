const ValidationService = require('../services/ValidationService');
const { ValidationError } = require('../utils/ErrorTypes');

const validationService = new ValidationService();

function validateSubmission(req, res, next) {
  const { error } = validationService.validateSubmission(req.body);
  if (error) {
    throw new ValidationError('Invalid submission data', error.details);
  }
  next();
}

module.exports = {
  validateSubmission,
};
