import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import { userProfileController } from './controller';

import { FILE_MAX_SIZE } from '~/libs/util/constants';
import multer from 'multer';

const profile = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: FILE_MAX_SIZE } });

profile.route('/save').all(tokenValidation).patch(upload.single('image'), userProfileController);

export default profile;
