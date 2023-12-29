const responseCodeMapper = {
  200: 'OK',
  201: 'CREATED',
  204: 'NO_CONTENT',
  400: 'BAD_REQUEST',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  500: 'INTERNAL_SERVER_ERROR'
}

const sendAPIResponse = (responseObject, statusCode, data = [], errorData = null, headers = {}) => {
  return responseObject.status(statusCode).json({
    status: responseCodeMapper[statusCode] || 'INTERNAL_SERVER_ERROR',
    data: data,
    error: errorData
  })
}

module.exports = {
  sendAPIResponse
}