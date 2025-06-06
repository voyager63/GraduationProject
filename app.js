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
  async db(alias, param = []) {
    return new Promise((resolve, reject) => {
      dbPool.query(sql[alias].query, param, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  }
};


app.post('/api/:alias', async (req, res) => {
  try {
    const alias = req.params.alias;
    let param = [];

    switch (alias) {
      case 'signUp':
        param = [
          req.body.userId,
          req.body.password,
          req.body.userName,
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
      
      case 'logout':
        req.session.destroy(err => {
          if (err) {
            console.error('로그아웃 중 오류:', err);
            return res.status(500).send({ message: '로그아웃 실패' });
          }
          res.clearCookie('connect.sid');
          res.send({ success: true, message: '로그아웃 되었습니다.' });
        });
        return

      case 'productList':
        param = [];
        break;

      case 'productRegister':
        const sellerId = req.session.user?.user_id;
        if (!sellerId) {
          return res.status(401).send({ message: '로그인이 필요합니다.' });
        }

        param = [
          sellerId,
          req.body.name,
          req.body.price,
          req.body.quality,
          req.body.timeUsed
        ];
        break;
      
      case 'getMyProducts':
        const userId = req.session.user?.user_id;

        if (!userId) {
          return res.status(401).send('로그인이 필요함');
        }

        param = [userId];

        break;

      case 'deleteProduct':
        const user = req.session.user;
        if (!user) return res.status(401).send({ message: '로그인이 필요합니다.' });

        param = [req.body.productId, user.user_id];
        break;

      default:
        return res.status(400).send('없는 경로임');
    }

    
    const result = await request.db(alias, param);

    if(alias === 'login'){
      if (result.length === 1) {
        req.session.user = result[0];
        res.send({ success: true, user: result[0] });
      } else {
        res.status(401).send({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
    }
    else {
      return res.send(result);
    }

  } catch (error) {
    console.error('서버 오류 발생:', error);
    res.status(500).json({ message: error.message || '서버 오류' });
  }
});

app.listen(port, ()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});