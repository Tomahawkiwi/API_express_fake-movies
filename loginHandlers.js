const database = require("./database");

const isItDwight = async (req, res) => {
  const { email, password } = req.body;

  if (email === "dwight@theoffice.com" && password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.status(401).send("Credentials aren't valid");
  }
};

module.exports = {
  isItDwight,
};
