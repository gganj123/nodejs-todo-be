const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("이미 가입이 된 유저 입니다.");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log("hash", hash);
    const newUser = new User({ email, name, password: hash });
    await newUser.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", err: err.message });
  }
};

userController.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //유저가 적은 password 는 그대로의 password
      //user.password => 암호화된 패스워드... 그래서 직접 비교는 안된다!
      const isMatch = bcrypt.compareSync(password, hash);
      if (isMatch) {
      }
    }
  } catch (err) {}
};

module.exports = userController;
