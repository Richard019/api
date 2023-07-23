"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _photo = require('../models/photo'); var _photo2 = _interopRequireDefault(_photo);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('photo');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      console.log(req.user.id);
      if (error) {
        res.status(400).json({
          errors: [error.code],
        });
      }

      const { originalname, filename } = req.file;
      const { aluno_id } = req.body;

      try {
        const foto = await _photo2.default.create({ originalname, filename, aluno_id });
        return res.json({ foto });
      } catch (e) {
        return res.status(400).json({
          errors: [e],
        });
      }
    });
  }
}

exports. default = new PhotoController();
