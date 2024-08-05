import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import restRoutes from './routers';
import serverGraphQL from 'infra/http/graphql/server';

const app = express();

app.use(morgan("dev"));
app.use(helmet());

app.use('/api/rest/', restRoutes);
app.use('/api/graphql/', serverGraphQL);

export default app;