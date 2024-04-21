import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/login', (req, res) => {
    // login html page will be rendered here
    console.log('test');
});

app.listen(port, () => {
    console.log('Running on: http://localhost:3000');
})