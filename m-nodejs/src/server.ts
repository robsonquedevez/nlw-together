import 'reflect-metadata';
import express from 'express'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ ok : true});
})

app.listen(3000, () => { console.log('server running') });