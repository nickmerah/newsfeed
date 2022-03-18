const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const log_surname = req.body.log_surname;
  const log_firstname = req.body.log_firstname;
  const log_othernames = req.body.log_othernames;
  const log_username = req.body.log_username;
  const log_email = req.body.log_email;
  const log_password = req.body.log_password;
  const log_programmeid = req.body.log_programmeid;
  const phoneno = req.body.phoneno;

  bcrypt
    .hash(log_password, 12)
    .then(hashedPw => {
      const user = new User({
        log_surname: log_surname,
        log_password: hashedPw,
        log_surname: log_surname,
        log_firstname: log_firstname,
        log_othernames: log_othernames,
        log_username: log_username,
        log_email: log_email,
        log_programmeid: log_programmeid,
        phoneno: phoneno
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result.id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.login = (req, res, next) => {
  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const log_email = req.body.log_email;
  const log_password = req.body.log_password;

  User.findOne({
    where: { log_email: log_email },
    attributes: ['log_id', 'log_email', 'log_password']
  })
    .then(user => {
      if (!user) {
        const error = new Error('Email does not exist!');
        error.statusCode = 401;
        throw error;
      }
      loadeduser = user;
      return bcrypt.compare(log_password, user.log_password);
    }).then(isEqual => {
      if (!isEqual) {
        const error = new Error('Invalid Password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        log_email: loadeduser.log_email,
        userid: loadeduser.log_id
      }, 'passkey', { expiresIn: '1h' });
      res.status(200).json({
        token: token, userid: loadeduser.log_id
      });
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
