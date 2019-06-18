const { AppError, AppErrorTypes } = require('../error/error');
const livres = require('../../assets/livres.entities.json') || [];

const getNextId = () => Math.max(...livres.map(livre => livre.id)) + 1;

const findAll = () => Promise.resolve(livres);

const find = id => {
  const entity = livres.find(livre => livre.id === id);
  if (entity) {
    return Promise.resolve(entity);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No livre with id=${id} has been found`);
    return Promise.reject(error);
  }
};

const create = entity => {
  const livre = {...entity, id: getNextId()};
  livres.push(livre);
  return Promise.resolve(livre);
};

const update = entity => {
  const index = livres.findIndex(livre => livre.id === entity.id);
  if (index > -1) {
    livres[index] = entity;
    return Promise.resolve(entity);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No livre with id=${entity.id} has been found`);
    return Promise.reject(error);
  }
};

const remove = id => {
  const index = livres.findIndex(livre => livre.id === id);
  if (index > -1) {
    const [livre] = livres.splice(index, 1);
    return Promise.resolve(livre);
  } else {
    const error = new AppError(AppErrorTypes.RESOURCE_NOT_FOUND, `No livre with id=${id} has been found`);
    return Promise.reject(error);
  }
};

module.exports = {
  findAll,
  find,
  create,
  update,
  remove
};