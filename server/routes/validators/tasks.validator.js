const { body, validationResult } = require("express-validator");

exports.validationBodyRules = [
  body("title", "title is required")
    .exists()
    .notEmpty()
    .withMessage("title is required."),
  // body('status').exists().isIn()
];

exports.checkRules = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const { errors } = result;
    return res.status(400).json({ msg: errors[0].msg });
  }
  next();
};
