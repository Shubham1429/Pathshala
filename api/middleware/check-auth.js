const jwt = require("jsonwebtoken");
const role = require("./authorize");
// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     //  req.userData = decoded;
//     console.log("1");
//     if (
//       role[decoded.role].find(function (url) {
//         return url == req.baseUrl;
//       })
//     ) {
//       console.log("2");
//       req.userData = decoded;
//       next();
//     } else
//       return res
//         .status(401)
//         .send(
//           "Access Denied: You dont have correct privilege to perform this operation"
//         );
//   } catch (error) {
//     return res.status(401).json({
//       message: "Auth failed",
//     });
//   }
// };

module.exports = (req, res, next) => {
  const token = req.header("x-auth-header");
  if (!token) return res.status(401).send("Access Denied: No Token Provided!");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (
      role[decoded.role].find(function (url) {
        return url == req.baseUrl;
      })
    ) {
      req.user = decoded;
      next();
    } else
      return res
        .status(401)
        .send(
          "Access Denied: You dont have correct privilege to perform this operation"
        );
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
};
