const validate = (schema, data) => {
  return schema.parse(data)
}

module.exports = {
  validate
}
