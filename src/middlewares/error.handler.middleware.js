const { BadRequestError, NotFoundError } = require("../utils/error");
const { StatusCodes } = require("../utils/status-code");
const { sendAPIResponse } = require("../utils/api-responses.js");

const handleErrors = (error, req, res, next) => {
  if (error instanceof BadRequestError) {
    return sendAPIResponse(res, StatusCodes.BAD_REQUEST, null, {message: error.message});
  }
  else if (error instanceof NotFoundError) {
    return sendAPIResponse(res, StatusCodes.NOT_FOUND, null, {message: error.message});
  }
  else {
    return sendAPIResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, null, {message: error.message});
  }
}

module.exports = {handleErrors}