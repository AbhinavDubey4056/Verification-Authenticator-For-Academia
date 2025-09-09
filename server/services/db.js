const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'certificateDB'
});

db.connect(err => {
  if(err) console.log('DB connection error:', err);
  else console.log('Connected to MySQL DB');
});

module.exports = db;
