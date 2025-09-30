const Joi = require('joi');

class ValidationService {
  constructor() {
    this.answerSchema = Joi.object({
      questionId: Joi.number().required(),
      selectedOptionId: Joi.number().required(),
    });

    this.submissionSchema = Joi.object({
      answers: Joi.array().items(this.answerSchema).min(1).required(),
    });
  }

  validateSubmission(data) {
    return this.submissionSchema.validate(data);
  }
}

module.exports = ValidationService;
