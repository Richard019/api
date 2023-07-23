import multer from 'multer';
import Photo from '../models/photo';

import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('photo');

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
        const foto = await Photo.create({ originalname, filename, aluno_id });
        return res.json({ foto });
      } catch (e) {
        return res.status(400).json({
          errors: [e],
        });
      }
    });
  }
}

export default new PhotoController();
