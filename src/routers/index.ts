import { Router } from "express";
import userRoute from '../infra/http/rest/user';
import postRoute from '../infra/http/rest/post';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/post', postRoute);

export default routes;