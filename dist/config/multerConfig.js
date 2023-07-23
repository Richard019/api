"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

exports. default = {
  fileFilter: (req, file, cb) => {
    if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
      return cb(new (0, _multer.MulterError)('arquivo precisa ser PNG ou JPEG'));
    }
    return cb(null, true);
  },
  storage: _multer2.default.diskStorage({
    destination(req, file, cb) {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
      cb(null, `${uniqueSuffix}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
