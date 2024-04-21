import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("login goes here");
});

app.get('/weather', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'weather.html');

    res.sendFile(_retfile);
});


app.listen(port, () => {
    console.log('Running on: http://localhost:3000');
})