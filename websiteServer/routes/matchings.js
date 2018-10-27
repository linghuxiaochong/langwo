
var express = require('express');
var router = express.Router();
const _ = require('lodash');
const client = require('ykt-http-client');
client.url('localhost:8080');

router.get('/', async function (req, res, next) {
  let { type, value} = req.query;
  let searchObj={};
  let data = await client.get('/matchings',{submitType: "findJoin", ref: ["movies", "cinemases"]});
    if (type){
      data = _.filter(data, (o) => { return o[type]._id==value})
    } 
    // else if (type == 'cinemases._id') {
    //   data = _.filter(data, (o) => { return  value).test(o[type].name)})
    // }
  // data = _.groupBy(data, 'movies._id');
  // // console.log(data);
  // let result = [];
  // _.forOwn(data, function (value, key) {
  //   result.push(value);
  // });
  // console.log(result);
  // data=result;
  res.send(data);
});
router.get('/:id', async function (req, res, next) {
  let data = await client.get(`/matchings/${req.params.id}`,{submitType: "findJoin", ref: ["movies", "cinemases"]});
  res.send(data);
});
router.put('/:id', async function (req, res, next) {
  req.body.rooms = JSON.parse(req.body.rooms);
  console.log(req.body);
  let data = await client.put(`/matchings/${req.params.id}`,{rooms:req.body.rooms});
  res.send('suc');
});



// router.post('/', async function (req, res, next) {
//   let data = await client.post('/matchings', req.body);
//   res.send('suc');
// });

// router.delete('/', async function (req, res, next) {
//   let id = JSON.parse(req.body.id);
//   console.log(id);
//   for (let item of id) {
//     await client.delete(`/matchings/${item}`);
//   };
//   res.send('suc');
// });




module.exports = router;