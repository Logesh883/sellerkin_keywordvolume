const errHandling = (status, message) => {
  const err = new Error();
  err.status = status || 400;
  err.message = message || "Error in Connection";
  return err;
};

module.exports = errHandling;
