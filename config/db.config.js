
const mysql= require('mysql');
const transaction =  require('node-mysql-transaction');
var mkdirp = require('mkdirp');
var crypto = require('crypto');


const trCon = transaction({
  connection : [mysql.createConnection,{
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'test'
}],
dynamicConnection: 32,
idleConnectionCutoffTime: 1000,
timeout:600});

trCon.set((err, db)=>{
  db.query("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )", [],(err, result)=>{
    if(err) db.rollback()
  });

  db.query("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) )",[],(err, result)=>{
      if(err) db.rollback()
    });

  const salt = crypto.randomBytes(16);

  db.query('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      'doddy',
      crypto.pbkdf2Sync("king", salt, 310000, 32, 'sha256'),
      salt
    ], (err, result)=>{
      if(err) db.rollback()
  });
  if(err) throw err;
    console.log(err);
});

module.exports = trCon;

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

