const moment = require('moment');

const toDto = entity => ({
  id: entity.id,
  title: entity.title,
  description: entity.description,
  publicationDate: moment(entity.publicationDate).format(),
  authors: [...(entity.authors || [])]
});

const toEntity = dto => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  publicationDate: moment(dto.publicationDate).valueOf(),
  authors: [...(dto.authors || [])]
});

module.exports = {
  toDto,
  toEntity
};
