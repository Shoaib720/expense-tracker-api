class BadRequestError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError
}