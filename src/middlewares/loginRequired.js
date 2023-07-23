import jwt from 'jsonwebtoken';
import User from '../models/User';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id, email };

    const user = User.findOne({ where: { id, email } });

    if (!user) {
      return res.json({
        errors: ['Usuario inválido'],
      });
    }
    return next();
  } catch (e) {
    console.log(e);
    return res.json({
      errors: ['Token inválido', e.message],
    });
  }
};
