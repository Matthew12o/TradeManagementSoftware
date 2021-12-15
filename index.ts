import express from 'express';

// Routers
import { externalAPIRouter } from './router/externalAPI';

const app = express();
const PORT = 8000;

app.use('/API', externalAPIRouter);

app.listen(PORT);