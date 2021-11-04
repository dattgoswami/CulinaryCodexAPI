import express from 'express';
import routes from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
//we want our endpoint api to use routes as a middleware
app.use('/', routes);

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});

export default app;
