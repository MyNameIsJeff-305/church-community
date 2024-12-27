const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Spot } = require('../db/models');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        next(err);
    }
    next();
};

const properUserValidation = async (req, res, next) => {
    const { id } = req.user;
    const { spotId } = req.params;
    try {
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

        if (spot.ownerId !== id) {
            const err = new Error('Unauthorized');
            err.status = 403;
            err.title = 'Forbidden';
            return next(err);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const validateLogin = [

    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Email or username is required"),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage("Password is required"),
    handleValidationErrors
];

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage("Username is required"),
    check('firstName').exists({ checkFalsy: true }).withMessage("First Name is required"),
    check('lastName').exists({ checkFalsy: true }).withMessage("Last Name is required"),
    handleValidationErrors
];

module.exports = {
    handleValidationErrors,
    properUserValidation,
    validateLogin,
    validateSignup
}