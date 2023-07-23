import multer, { MulterError } from 'multer';
import { resolve, extname } from 'path';

export default {
  fileFilter: (req, file, cb) => {
    if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
      return cb(new MulterError('arquivo precisa ser PNG ou JPEG'));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
      cb(null, `${uniqueSuffix}.${extname(file.originalname)}`);
    },
  }),
};
