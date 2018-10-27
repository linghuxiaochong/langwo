var express = require('express');
var router = express.Router();
const client = require("ykt-http-client");
client.url('localhost:8080');
const session = require("express-session");
const multiparty = require('multiparty');
const path = require('path');

// for (let i = 0; i < diretor.length - 1; i++) {
//   let k = [];
//   k.push(diretor[i].name);
// }

router.get('/', async function (req, res) {
  let { type,value,page,rows} = req.query;
  let searchObj = {};
  if (type) {
    searchObj[type] = value;
  };
  let data = await client.get("/movies",  {page,rows,...searchObj});
  res.send(data);
});
router.get("/:id", async function(req,res){
  let id = req.params.id;
  console.log(id);
  let data = await client.get("/movies/"+id);
  res.send(data);
})
router.put("/:id", async function (req, res) {
  let id = req.params.id;
  let data = await client.get("/movies/"+id);
  data.comment?data.comment.push(req.body):data.comment=[req.body];
delete data._id;
console.log(data);
data = await client.put("/movies/"+id,data);
res.send(data);
})
// //添加
// router.post("/add", async function (req, res) {
//   // console.log(123)
//   let body = req.body;

//   let data = await client.post("/movies", body);
//   // console.log(data);
//   res.send("suc");

// })
// //删除
// router.delete("/:id", async function(req,res){
  
//   let id = req.params.id;
//   // console.log(id);
//   let data = await client.delete("/movies/"+id);
//   // console.log(data);
//   res.send('suc');
// })

// //修改
// router.get("/put:id", async function(req,res){
//   let id = req.params.id;
//   console.log(id);
//   let data = await client.get("/movies/"+id);
//   // console.log('修改',data);
//   res.send(data);
// })


// //确认修改
// router.put("/:id", async function (req, res) {
//   let id = req.params.id;
//   let body = req.body;
//   console.log(id,body);
//   body.informations = {
//     $ref:"informations",
//     $id:body.informations
// }
//   let data  = await client.put("/movies/"+id,
//   {
//     // movieId:body.movieId,
//     cnname:body.cnname,
//     enname:body.enname,
//     type:body.type,
//     area:body.area,
//     year:body.year,
//     time:body.time,
//     uptime:body.uptime,
//     uparea:body.uparea,
//     want:body.want,
//     grade:body.grade,
//     gradeCount:body.gradeCount,
//     // boxOffice:body.boxOffice,
//     intro:body.intro,
//     director:body.director,
//     actor:body.actor,
//     awards:body.awards,
//     indexImg:body.indexImg,
//     allImg:body.allImg
//   }
//   );
//   res.send('ok');

// })






// body.informations = {
  //     $ref:"informations",
  //     $id:body.informations
  // }



module.exports = router;