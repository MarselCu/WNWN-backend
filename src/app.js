import express from 'express';

const app = express();

app.use(express.json());

// test server
app.get('/', (req, res) => {
  res.send('Hello from app.js (ES Module)!');
});

export default app;