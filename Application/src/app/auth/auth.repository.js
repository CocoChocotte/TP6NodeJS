const users = require('../../assets/user.entities');
const { AppError, AppErrorTypes } = require('../error/error');

const findByCredentials = (name, password) => {
  const user = users.find(user => user.name === name && user.password === password);
  if (user) {
    return Promise.resolve(user);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND,
      'No user with name=${name} & password=${password} has been found');
    return Promise.reject(error);
  }
};

const findById = id => {
  const user = users.find(user => user.id === id);
  if (user) {
    return Promise.resolve(user);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, 'No user with id=${id} has been found');
    return Promise.reject(error);
  }
};

module.exports = {
  findByCredentials,
  findById
};
