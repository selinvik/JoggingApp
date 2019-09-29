
const authorization = async (req, res, next) => {
  if (!req.user) {
    return done (null, false)
  }
  else next()
}

module.exports = authorization;