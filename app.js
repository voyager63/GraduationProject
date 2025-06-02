const express = require("express");
const app = express();
const port = 3000;

const dbPool = require("./db");
const path = require("path");
const session = require("express-session");
const sql = require("./sql");
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
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

app.get('/api/:alias', async (req, res)=>{
  const result = await request.db(req.params.alias);
    res.send(result);
})

app.post('/api/:alias', async (req, res) => {
  try {
    const alias = req.params.alias;
    let param = [];
    let where = '';

    switch (alias) {
      case 'signUp':
        param = [
          req.body.userId,
          req.body.password,
          req.body.email,
          req.body.phoneNumber,
        ];
        break;

      case 'login':
        param = [
          req.body.userId,
          req.body.password,
        ];
        break;

      case 'productList':
        param = [];
        break;
      
      case 'getMyProducts':
        const userId = req.session.user?.user_id;

        if (!userId) {
          return res.status(401).send('로그인이 필요함');
        }

        param = [userId];
        where = ' WHERE user_id = ?';
        break;

      default:
        return res.status(400).send('없는 경로임');
    }

    
    const result = await request.db(alias, param, where);
    res.send(result);
  } catch (error) {
    console.error('서버 오류 발생:', error);
    res.status(500).json({ message: error.message || '서버 오류' });
  }
});

app.listen(port, ()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});