class AppError extends Error {
  constructor(type, message) {
    super(message || type && type.description);
    this.type = type;
  }
}

class AppErrorType {
  constructor(httpCode, description) {
    this.httpCode = httpCode;
    this.description = description;
  }
}

const AppErrorTypes = {
  DTO_INVALID_FORMAT: new AppErrorType(400, 'Format DTO invalide'),
  PARAMETER_INVALID_FORMAT: new AppErrorType(400, 'Format invalide'),
  NOT_AUTHENTICATED: new AppErrorType(401, 'L utilisateur doit s identifier'),
  RESOURCE_NOT_FOUND: new AppErrorType(404, 'Ressource non trouvee'),
  OTHER_ERROR: new AppErrorType(500, 'Other error')
};

module.exports = {
  AppError,
  AppErrorTypes
};
