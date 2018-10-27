var express = require('express');
var router = express.Router();
const client = require('ykt-http-client');
client.url('localhost:8080');

router.get('/', async function (req, res) {
  let { type, value, page, rows } = req.query;
  let searchObj = {};
  let data = await client.get('/stay', { page, rows, submitType: "findJoin", ref: "movies"});
  // for (let i = 0; i < data.rows.length; i++) {
  //   if (data.rows[i].movies.cnname) {
  //     continue;
  //   } else {
  //     data.rows.splice(i, 1)
  //     i--;
  //   }
  // }
  // if (type) {
  //   searchObj[type] = value;
  //   for (let i = 0; i < data.rows.length; i++) {
  //     if (new RegExp(value).test(data.rows[i].movies[type])) {
  //       continue;
  //     } else {
  //       data.rows.splice(i, 1)
  //       i--;
  //     }
  //   }
  //   res.send(data);
  // }
  res.send(data);
});
// router.get('/add', async function (req, res) {
//   let data = await client.get('/movies');
//   res.send(data);
// });
// router.post('/', async function (req, res) {
//   let body = req.body;
//   let hots = await client.get('/hot', {});
//   let stays = await client.get('/stay', {});
//   for (var index in body) {
//     body = body[index];
//   }
//   let add = {};
//   if (Array.isArray(body)) {
//     for (let i = 0; i < body.length; i++) {
//            // 遍历热映
//            for (let h = 0; h < hots.length; h++) {
//             if (hots[h].movies.$id == body[i]) {
//               res.send({ status: 1 });
//               return;
//             }
//           }
//           // 遍历待映
//           for (let j = 0; j < stays.length; j++) {
//             if (stays[j].movies.$id == body[i]) {
//               res.send({ status: 2 });
//               return;
//             }
//           }
//       add.movies = {
//         $ref: "movies",
//         $id: body[i],
//       }
//       await client.post('/stay', add);
//     }
//   } else {
//     for (let h = 0; h < hots.length; h++) {
//       if (hots[h].movies.$id == body) {
//         res.send({ status: 3 });
//         return;
//       }
//     }
//     for (let j = 0; j < stays.length; j++) {
//       if (stays[j].movies.$id == body) {
//         res.send({ status: 4 });
//         return;
//       }
//     }
//     add.movies = {
//       $ref: "movies",
//       $id: body,
//     }
//     await client.post('/stay', add);
//   }
//   res.send("suc");
// });
// router.delete('/', async function (req, res) {
//   let body = req.body;
//   for (var index in body) {
//     body = body[index];
//   }

//   if (Array.isArray(body)) {
//     for (let i = 0; i < body.length; i++) {
//       await client.delete('/stay/' + body[i]);
//     }
//   } else {
//     await client.delete('/stay/' + body);
//   }
//   res.send("suc");
// });
module.exports = router;