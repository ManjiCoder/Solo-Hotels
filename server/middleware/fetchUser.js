const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  // token is not present
  if (!token) {
    return res.status(401).json({ msg: 'Please Authenticate using valid token' });
  }
  //   token is present
  try {
    // token is valid
    const payload = jwt.verify(token, process.env.JWT_SECRECT_KEY);
    req.user = payload.user;
    // console.log({ payload });
    // DO NOT SEND ANY res in Middleware it will throw an error
    // res.json({ data: payload.user });
    next();
  } catch (error) {
    console.log(error.msg);
    return res.status(401).json({ msg: 'Please Authenticate using valid token' });
  }
};
module.exports = fetchUser;
