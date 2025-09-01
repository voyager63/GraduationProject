const express = require("express");
const app = express();
const port = 3000;

const dbPool = require("./db");
const path = require("path");
const session = require("express-session");
const sql = require("./sql");
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

app.post('/api/messages/:id/respond', async (req, res) => {
    try {
        const messageId = req.params.id;
        const { action } = req.body;
        const receiver = req.session.user?.user_id;
        if (!receiver) return res.status(401).send({ message: '로그인이 필요합니다.' });

        const originalMsg = await request.db('getMessageById', [messageId]);
        if (!originalMsg.length) return res.status(404).send({ message: '메시지를 찾을 수 없음' });
        const msg = originalMsg[0];
        if (msg.receiver_id !== receiver) return res.status(403).send({ message: '권한 없음' });

        
        await request.db('deleteMessageCompletely', [messageId]);

        
        const replyContent = msg.contents + (action === 'accepted' ? ' - 거래 요청 수락됨' : ' - 거래 요청 거절됨');
        await request.db('sendMessage', [msg.product_id, receiver, msg.sender_id, replyContent, 0]);

        res.send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: '응답 처리 실패' });
    }
});

app.post('/api/registerProduct', upload.single('image'), async (req, res) => {
  try {
    const sellerId = req.session.user?.user_id;
    if (!sellerId) return res.status(401).send({ message: '로그인이 필요합니다.' });

    const { name, price, quality, timeUsed, description } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const param = [sellerId, name, price, quality, timeUsed, imagePath, description];
    const result = await request.db('registerProduct', param);
    res.send({ success: true, result });
  } catch (err) {
    console.error('상품 등록 실패:', err);
    res.status(500).send({ message: '상품 등록 실패' });
  }
});

app.post('/api/updateProduct', upload.single('image'), async (req, res) => {
  try {
    const sId = req.session.user?.user_id;
    if (!sId) return res.status(401).send({ message: '로그인이 필요합니다.' });

    const { name, price, quality, timeUsed, description, productId, imagePath } = req.body;

    // 기존 이미지 조회
    const existingProduct = await request.db('getProductDetails', [productId]);
    const existingImagePath = existingProduct[0]?.product_img;

    // 새 이미지가 들어오고 기존 이미지가 있으면 삭제
    if (req.file && existingImagePath) {
      const filePath = path.join(__dirname, existingImagePath);
      if (fs.existsSync(filePath)) fs.unlink(filePath, err => {
        if (err) console.error('기존 이미지 삭제 실패:', err);
      });
    }

    // DB에 들어갈 최종 이미지 경로
    const finalImagePath = req.file ? `/uploads/${req.file.filename}` : imagePath || existingImagePath || null;

    const param = [name, price, quality, timeUsed, finalImagePath, description, productId, sId];
    const result = await request.db('updateProduct', param);
    res.send({ success: true, result });
  } catch (err) {
    console.error('상품 수정 실패:', err);
    res.status(500).send({ message: '상품 수정 실패' });
  }
});

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
          req.body.timeUsed,
          req.body.description
        ];
        break;
      
      case 'getMyProducts':
        const userId = req.session.user?.user_id;

        if (!userId) {
          return res.status(401).send('로그인이 필요합니다.');
        }

        param = [userId];

        break;

      case 'deleteProduct':
        const user = req.session.user;
        if (!user) return res.status(401).send({ message: '로그인이 필요합니다.' });

        // 삭제 전 이미지 조회
        const productToDelete = await request.db('getProductDetails', [req.body.productId]);
        const imageToDelete = productToDelete[0]?.product_img;

        // 이미지 파일 삭제
        if (imageToDelete) {
          const filePath = path.join(__dirname, imageToDelete);
          if (fs.existsSync(filePath)) fs.unlink(filePath, err => {
            if (err) console.error('상품 이미지 삭제 실패:', err);
          });
        }

        param = [req.body.productId, user.user_id];
        break;

      default:
        return res.status(400).send('없는 경로입니다');
        
      case 'getProductDetails':
        param = [req.body.productId];
        break;

      case 'checkSession':
        if (req.session.user) {
          return res.send({ isLoggedIn: true, user: req.session.user });
        }
        else {
          return res.send({ isLoggedIn: false });
        }

      case 'sendMessage':
        const sender = req.session.user;
        if (!sender) return res.status(401).send({ message: '로그인이 필요합니다.' });

        param = [
          req.body.product_id,
          sender.user_id,
          req.body.receiver_id,
          req.body.contents,
          1
        ];
        break;

      case 'getMySentMessages':
        const senderId = req.session.user?.user_id;
        if (!senderId) {
          return res.status(401).send({ message: '로그인이 필요합니다.' });
        }
        param = [senderId];
        break;

      case 'getMyReceivedMessages':
        const receiverId = req.session.user?.user_id;
        if (!receiverId) {
          return res.status(401).send({ message: '로그인이 필요합니다.' });
        }
        param = [receiverId];
        break;

      case 'deleteMessageCompletely':
        const uId = req.session.user?.user_id;
        if (!uId) return res.status(401).send({ message: '로그인이 필요합니다.' });
        param = [req.body.messageId];
        break;

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