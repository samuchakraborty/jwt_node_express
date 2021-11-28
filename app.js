const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  var token = jwt.sign({ foo: "bar" }, "ki hobe");
  res.json({
    status: true,
    msg: "There is me",
    token: token,
  });
});
app.post("/api", verifyToken, (req, res) => {
  const token = jwt.verify(req.token, "ki hobe", (err, authToken) => {
    if (!err) {
      res.json({
        status: true,
        msg: "There is me",
        token: authToken,
      });
    }
  });

  //  var token = jwt.sign({ foo: "bar" }, "ki hobe");
});

function verifyToken(req, res, next) {
  const bearToken = req.headers["authorization"];

  if (typeof bearToken != undefined) {
    const breartoken = bearToken.split(" ")[1];

    req.token = breartoken;
    next();
  } else {
    res.status(404).json({
      status: 404,
      msg: "Token not match",
    });
  }
}

app.listen(PORT, () => {
  console.log("Server is Running in ", PORT);
});
