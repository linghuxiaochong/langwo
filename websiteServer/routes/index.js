var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const path = require('path');

/* GET home page. */

router.get('/getSession', function (req, res, next) {
  console.log(req.session.user);
  res.send(req.session.user||{});
});
router.get('/setSession', function (req, res, next) {
  req.session.user={};
  res.send('注销成功');
});
router.post("/upload",function(req,res){//上传图片
  let form = new multiparty.Form({uploadDir:"./public/upload"});
  form.parse(req,function(err,fields,files){
    if(err){
      res.send(err);
    } else {
      res.send(path.basename(files.informationsUploadImg[0].path));
    }
  });
});


//图片渲染
//上传图片
router.post("/uploadhead", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadHeader[0].path));
    }
  })
})
router.post("/uploadurlDir", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadDirector[0].path));
    }
  })
})
router.post("/uploadurlAcot", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadActor[0].path));
    }
  })
})
router.post("/uploadurlAwar", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadawards[0].path));
    }
  })
})
router.post("/uploadurlIndex", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadIndexImg[0].path));
    }
  })
})
//图集上传
// router.post("/uploadurlAll", function (req, res) {
//   let form = new multiparty.Form({ uploadDir: "./public/upload" });
//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       res.send(err);
//     }
//     else {
//       // console.log(files);
//       let arr = [];
//       for(let i = 0 ; i<=files.uploadAllImg.length-1;i++){
//         if(files.uploadAllImg.length!=0){
//           arr.push(files.uploadAllImg[i]);
//           for(let j = 0;j<=arr.length-1;j++){
//             res.send(path.basename(arr[j].path));
//             console.log(arr[j].path);
            
//           }
//         }
//       }
//     }
//   })
// })
//修改图片
// router.post("/uploadurl", function (req, res) {
//   let form = new multiparty.Form({ uploadDir: "./public/upload" });
//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       res.send(err);
//     }
//     else {
//       res.send(path.basename(files.uploadHeaderX[0].path));
//     }
//   })
// })
router.post("/uploadDirurl", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadDirectorX[0].path));
    }
  })
})
router.post("/uploadActurl", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadActorX[0].path));
    }
  })
})
router.post("/uploadAwaurl", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadawardsX[0].path));
    }
  })
})
router.post("/uploadIndexurl", function (req, res) {
  let form = new multiparty.Form({ uploadDir: "./public/upload" });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(path.basename(files.uploadIndexImgX[0].path));
    }
  })
})
// router.post("/uploadAllurl", function (req, res) {
//   let form = new multiparty.Form({ uploadDir: "./public/upload" });
//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       res.send(err);
//     }
//     else {
//       res.send(path.basename(files.uploadAllImgX[0].path));
//     }
//   })
// })





module.exports = router;
