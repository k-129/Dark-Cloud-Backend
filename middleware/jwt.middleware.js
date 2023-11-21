const { expressjwt: jwt } = require("express-jwt");
const NO_SECRET = "@mamaSUm4e129";
const isAuthenticated = jwt({
  secret: `${process.env.JWT_SECRET_KEY}` || NO_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error extracting token from headers:", error);
    return null;
  }
}

module.exports = { isAuthenticated };
