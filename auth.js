const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 2,
    });
    req.body.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const verifyPassword = async (req, res) => {
  const { password } = req.body;
  const { hashedPassword } = req.user;
  try {
    if (await argon2.verify(hashedPassword, password)) {
      res.send("Credentials are valid");
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
