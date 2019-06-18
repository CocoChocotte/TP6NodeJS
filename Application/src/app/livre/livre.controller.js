const repository = require('./livre.repository');
const mapper = require('./livre.mapper');
const {AppError, AppErrorTypes} = require('../error/error');

const findAll = (req, res, next) => {
  repository.findAll()
    .then(entities => {
      const livres = entities.map(mapper.toDto);
      res.json(livres);
    })
    .catch(next)
};


const create = (req, res, next) => {
  const livre = req.body;
  if (!livre) {
    next(new AppError(AppErrorTypes.DTO_INVALID_FORMAT));
  }
  const entity = mapper.toEntity(livre);
  repository.create(entity)
    .then(createdEntity => {
      const createdlivre = mapper.toDto(createdEntity);
      res.status(201).json(createdlivre);
    })
    .catch(next);
};

const find = (req, res, next) => {
  const livreId = parseInt(req.params.id);
  if (!livreId) {
    return next(new AppError(AppErrorTypes.DTO_INVALID_FORMAT));
  }
  repository.find(livreId)
    .then(entity => {
      const livre = mapper.toDto(entity);
      res.json(livre);
    })
    .catch(next);
};

const remove = (req, res, next) => {
  const livreId = parseInt(req.params.id);
  if (!livreId) {
    return next(new AppError(AppErrorTypes.PARAMETER_INVALID_FORMAT));
  }
  repository.remove(livreId)
    .then(() => res.sendStatus(204))
    .catch(next);
};



module.exports = {
  findAll,
  find,
  create,
  update,
  remove
};