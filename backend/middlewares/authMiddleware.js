const jwt = require("jsonwebtoken");
// import '@ant-design/v5-patch-for-react-19';
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({ message: "auth failed", success: false });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "auth failed", success: false });
  }
};
