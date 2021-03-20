const handleErros = (err, req, res, next) => {
  const {code, message } = err;
  return res.status(code).json({
    status: 'error',
    message: message
  });
}

module.exports = handleErros;