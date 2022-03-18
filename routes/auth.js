const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
  body('log_email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({ where: { log_email: value } }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!');
        }
      });
    })
    .normalizeEmail(),
  body('log_username')
    .trim()
    .custom((value, { req }) => {
      return User.findOne({ where: { log_username: value } }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('Username already exists!');
        }
      });
    }),
  body('log_password')
    .trim()
    .isLength({ min: 5 }),
  body('log_surname')
    .trim()
    .not()
    .isEmpty(),
  body('log_firstname')
    .trim()
    .not()
    .isEmpty(),
  body('log_programmeid')
    .not()
    .isEmpty(),
  body('phoneno')
    .trim()
    .isLength({ min: 11 })
], authController.signup);

router.post('/login', [
  body('log_email')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  body('log_password')
    .trim()
    .isLength({ min: 5 })
], authController.login);

module.exports = router;