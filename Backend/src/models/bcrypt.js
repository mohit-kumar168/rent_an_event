'use strict';
const bcrypt = require('bcryptjs');

const crypt = {};
const saltRounds = 10;

// Hash function using Promises
crypt.createHash = (data) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(data, salt, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
};

// Compare function using Promises
crypt.compareHash = (data, encrypted) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, encrypted, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

module.exports = crypt;
