import express from 'express';
import bodyParser from 'body-parser';

import { webhooksRouter } from './routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());

// Routes
app.use('/webhooks', webhooksRouter);

export function bootstrap() {
  app.listen(port, () => {
    console.log(`🚀 Express server started on port ${port}`);
  });
}
