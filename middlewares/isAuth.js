module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    // Como estou usando um SPA, posso retornar um JSON e receber no front-end
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};