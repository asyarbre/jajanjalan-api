module.exports = (...roles) => {
  return (req, res, next) => {
    const { role } = req.userData;
    if (!roles.includes(role)) {
      return res.status(400).json({
        status: "error",
        message: "You don't have permission to access this resource",
      });
    }
    return next();
  };
}