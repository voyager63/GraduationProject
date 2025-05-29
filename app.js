const express = require("express");
const app = express();
const port = 3000;

const dbPool = require("./db");
const path = require("path");
const session = require("express-session");
const sql = require("./sql");

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: true,
    httpOnly: true
  }
}));

const request = {
  async db(alias, param = [], where = ' ') {
    return new Promise((resolve, reject) => {
      dbPool.query(sql[alias].query + where, param, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};

app.get('/api/:alias', async (req, res) =>{
    try{
        res.send(await request.db(req.params.alias))
    }
    catch(error){
        res.status(500);
        res.send("error");
    }
})

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get("/", (req, res)=>{
    res.status(200);
    res.send("Hello World!");
});

app.listen(port, ()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});