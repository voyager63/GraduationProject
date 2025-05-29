const express = require("express");
const app = express();
const port = 3000;

const db = require("./db");

db.query('SELECT * FROM user', (err, results)=>{
    if(err){
        console.log('쿼리 에러:', err);
        return;
    }
    console.log('쿼리 결과:', results);
});


app.get("/", (req, res)=>{
    res.status(200);
    res.send("Hello World!");
});

app.listen(port, ()=>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});