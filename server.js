import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import colors from 'colors';
import routes from './routes';
import { log, firebaseConfig } from './utils';
import serviceAccount from './serviceAccount.js';

firebaseConfig.admin.initializeApp({
  credential: firebaseConfig.admin.credential.cert(serviceAccount),
  databaseURL: "https://postit-3111a.firebaseio.com"
});

export const db = firebaseConfig.admin.firestore();

dotenv.config();


const app = express();

const port = process.env.PORT || 8080

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', routes);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(port, (err) => {
  if (err) {
    return {
      error: err,
      message: 'but stuff works'
    };
  }
  colors.green(log.info(`Server runnin on port ${port}...`));
});

export default app;
