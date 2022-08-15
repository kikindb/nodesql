module.exports = async function (req, res, next) {
  console.log(req.user);
  if (!req.user.admin) return res.status(403).send({ error: "Not Authorized" });
  next();
};
