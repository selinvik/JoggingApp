const bcrypt = require('bcrypt');
const {ENCRYPT_SALT_ROUNDS} = require('../config/constants');

const password = {
  GeneratePasswordHash: (password) => {
    return bcrypt.genSalt(ENCRYPT_SALT_ROUNDS)
      .then((salt) => {
        return bcrypt.hash(password, salt)
          .then((hash) => {
            return hash;
          })
          .catch(() => null);
      })
      .catch(() => null);
  },
  ComparePasswordWithHash: (password, hash) =>{
    return bcrypt.compare(password, hash)
      .then(res => res)
      .catch(() => null)
  }
}

module.exports = password;