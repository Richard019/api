"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const { id, email } = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    req.user = { id, email };

    const user = _User2.default.findOne({ where: { id, email } });

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
