// import { log } from 'util';

var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url('localhost:8080');
/* GET users listing. */
router.get('/', async function (req, res) {
  // let apply = req.require;
  // let data = await client.get("/cinemases",{});
  // res.send(data);
  let { type, value, page, rows } = req.query;
  if (value) {
    console.log(type, value,page,rows);
    let data = await client.get('/cinemases', { page, rows, [type]: value });
    console.log(data);
    res.send(data);

  } else {
    let data = await client.get('/cinemases', { page, rows });
    res.send(data);
  }
});
router.post('/', async function (req, res) {
  console.log('post');
  let { name, addr, website, tel, rooms } = req.body;
  console.log(name, website, addr, tel, rooms);
  await client.post("/cinemases", { name, addr, website, tel, rooms });
  res.send("OK");
});
router.get('/:id', async function (req, res) {//修改
  let id = req.params.id;
  console.log(id);
  let data = await client.get('/cinemases/' + id);
  res.send(data);
});
router.put('/:id', async function (req, res) {//确认修改
  console.log(123);
  let { name, addr, website, tel, rooms } = req.body;
  let id = req.params.id;
  console.log(id);
  await client.put('/cinemases/' + id, { name, addr, website, tel, rooms });
  res.send('OK');
});
router.delete('/:id', async function (req, res) {//删除
  let id = req.params.id;
  await client.delete('/cinemases/' + id);
  res.send('OK');
});
module.exports = router;