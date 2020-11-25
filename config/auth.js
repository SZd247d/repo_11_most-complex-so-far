const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.authenticate = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });

      if (user) {
        if (bcrypt.compare(password, user.password)) {
          resolve(user);
        } else {
          reject('Authentication Failed');
        }
      }
    } catch (err) {
      reject('Authentication Failed');
    }
  });
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'Please log in to view this resource');
  res.redirect('/users/login');
};
