const express = require("express");
const app = express();
const port = 3000;

const db = require("./db");
const path = require("path");

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