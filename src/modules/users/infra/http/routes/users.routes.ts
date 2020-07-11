import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

const userAvatarController = new UserAvatarController();
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
