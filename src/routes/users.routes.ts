import { Router } from 'express';
import multer from 'multer';
import uploadCofing from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthincated';

const usersRouter = Router();

const upload = multer(uploadCofing);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default usersRouter;
