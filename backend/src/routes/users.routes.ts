import { Router } from 'express';

import GetUsersService from '../services/GetUsersService';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', async (request, response) => {
  const users = await new GetUsersService().execute();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      is_provider,
      email,
      password,
    } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      first_name,
      last_name,
      phone,
      is_provider,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.delete('/:id', async (request, response) => {
  // TODO
});

usersRouter.post('/import', async (request, response) => {
  // TODO
});

export default usersRouter;
