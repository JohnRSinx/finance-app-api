import express from 'express';
import 'dotenv/config.js'
import { PostgresHelper } from './src/db/postgres/helper.js';

const app = express();

app.get('/', async (req, res) => {
  try {
    const results = await PostgresHelper.query('SELECT * FROM users;');
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.listen(3000, () =>
  console.log(`listening on port 3000`)
);
