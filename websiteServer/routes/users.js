var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url("127.0.0.1:8080");
//登陆
router.post('/login', async function (req, res) {
  let body = req.body;
  let username = body.username;
  let pwd = body.pwd;
  let data = await client.post('/login', {username,pwd});
  if(data.username){
    req.session.user={username};
    res.send({ status: 1 ,user:data});
  }else{
    res.send({ status: 0 });
  }
})
//增加
router.post("/", async function (req, res) {
  let body = req.body;
  await client.post('/users', body);
  res.send("suc");
})

//搜索和渲染部分
router.get("/", async function (req, res) {
  //搜索
  let { type, value, page, rows } = req.query;
  let searchobj = {};
  if (type) {
    searchobj[type] = value;
  }
  //渲染 
  let data = await client.get("/users", { page, rows, ...searchobj });
  res.send(data);
})

// //获取到id
// router.get("/:id ", async function (req, res) { //async同步异步
//   let id = req.params.id;
//   let data = await client.get('/users/' + id)
//   res.send(data);
// })



// //删除
// router.delete("/:id", async function (req, res) {
//   let id = req.params.id;
//   await client.delete('/users/' + id);
//   res.send("suc");
// })

// //修改
// router.get("/:id", async function (req, res) {
//   let id = req.params.id;
//   let data = await client.get("/users/" + id);
//   res.send(data);
// })

// //确认修改
// router.put("/:id", async function (req, res) {
//   let id = req.params.id;
//   let body = req.body;
//   await client.put("/users/" + id, body);
//   res.send("suc");
// })

module.exports = router;
