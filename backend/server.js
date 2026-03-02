const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected at ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
