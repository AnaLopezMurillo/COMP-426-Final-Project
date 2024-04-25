import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import { db } from './db.mjs';


const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'login.html');

    res.sendFile(_retfile);
});

app.get('/weather', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'weather.html');

    res.sendFile(_retfile);
});

//GET & POST Endpoints:
app.get('/user', async (req, res) => {
  const { pid } = req.query;

  try {
    if (pid) {
      // Fetch cities for a specific user PID
      const cities = await db.all(`SELECT * FROM cities WHERE pid = ?`, pid);
      if (cities.length > 0) {
        res.status(200).json(cities);
      } else {
        res.status(404).send({ error: 'No cities found for this PID' });
      }
    } else {
      // Fetch all users and their cities
      const users = await db.all(`SELECT * FROM user`);
      const results = await Promise.all(users.map(async (user) => {
        const cities = await db.all(`SELECT * FROM cities WHERE pid = ?`, user.pid);
        return {
          pid: user.pid,
          cities: cities
        };
      }));
      res.status(200).json(results);
    }
  } catch (error) {
    console.error('Failed to retrieve data:', error);
    res.status(500).send({ error: 'Failed to retrieve data' });
  }
});

app.post('/user', async (req, res) => {
  const { pid } = req.body;
  if (typeof pid !== 'number') {
    return res.status(400).send('PID must be an number.');
  }
  try {
    await db.run(`INSERT INTO user (pid) VALUES (?)`, pid);
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Failed to create user:', error);
    res.status(500).send({ error: 'Failed to create user' });
  }
});


app.post('/user/city', async (req, res) => {
  const { pid, name, weather, wind_speed, temp } = req.body;
  if (!pid || !name || !weather || wind_speed == null || temp == null) {
    return res.status(400).send({ error: 'All fields must be provided' });
  }
  try {
    await db.run(`INSERT INTO cities (name, weather, wind_speed, temp, pid) VALUES (?, ?, ?, ?, ?)`, [name, weather, wind_speed, temp, pid]);
    res.status(201).send({ message: 'City added successfully' });
  } catch (error) {
    console.error('Failed to add city:', error);
    res.status(500).send({ error: 'Failed to add city' });
  }
});

app.listen(port, () => {
    console.log('Running on: http://localhost:3000');
})
