var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url('localhost:8080');
/* GET users listing. */


router.get("/", async function (req, res) {//渲染页面
  // let value = req.query.value;
  let { type, value, page, rows } = req.query;
  let searchObj = {};
  if (type) {//模糊查询
    searchObj[type] = value;
  }
  let data = await client.get("/informations", { page, rows, ...searchObj });
  res.send(data);
});
router.get("/:id", async function (req, res) {//修改弹窗信息
  let id = req.params.id;
  let data = await client.get("/informations/" + id);
  res.send(data);
});


// router.post("/add", async function (req, res) {//增加信息
//   let body = req.body;
//   await client.post("/informations", body);
//   res.send("suc");
// });

// router.delete("/", async function (req, res) {//删除信息
//   let body = req.body;
//   for (let item in body) {
//     body = body[item];
//   }
//   if (Array.isArray(body)) {
//     for (let id of body) {
//       await client.delete("/informations/" + id);
//     }
//   } else {
//     await client.delete("/informations/" + body);
//   }
//   res.send("suc");
// });



// router.put("/:id", async function (req, res) {//确认修改
//   let id = req.params.id;
//   let body = req.body;
//   await client.put("/informations/" + id, body);
//   res.send("suc");
// });
module.exports = router;