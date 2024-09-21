class ResponseError extends Error {
  constructor(status, message) {
    if (typeof status !== 'number') {
      throw new TypeError('Status must be a number')
    }
    if (typeof message !== 'string') {
      throw new TypeError('Message must be a string')
    }

    super(message)
    this.status = status
  }
}

module.exports = {
  ResponseError
}
