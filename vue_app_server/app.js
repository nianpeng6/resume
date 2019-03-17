//1.加载模块 express pool
const express = require("express");
const pool = require("./pool");
const cors = require('cors');
//7.1   加载第三方模块
const session = require('express-session');
//2.创建express对象
var app = express();

//4.指定静态目录
app.use(express.static(__dirname + "/public"));
//配置允许脚手架访问程序
app.use(cors({
  origin:['http://localhost:3001', 'http://127.0.0.1:3001'],
  //1orgin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials:true
})
)
// 7.2 对模块进行配置
app.use(session({
  secret: '128位随机数', //安全字符串
  resave: false, //请求保存
  saveUninitialized: true, //初始化保存
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}))

//3.指定监听端口3000
app.listen(3000);

//5.get /imgelist
app.get("/imagelist", (req, res) => {
  var obj = [
    { id: 1, img_url: "http://127.0.0.1:3000/img/banner1.png" },
    { id: 2, img_url: "http://127.0.0.1:3000/img/banner2.png" },
    { id: 3, img_url: "http://127.0.0.1:3000/img/banner3.png" },
    { id: 4, img_url: "http://127.0.0.1:3000/img/banner4.png" }
  ];
  res.send(obj);
})

//功能二:新闻分页显示
app.get("/newslist", (req, res) => {
  //1:获取参数
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值 1 7
  if (!pno) {
    pno = 1
  }
  if (!pageSize) {
    pageSize = 7
  }
  //3:创建正则表达式验证用户输入验证
  var reg = /^[0-9]{1,3}$/;
  //4:如果错出停止函数运行
  if (!reg.test(pno)) {
    res.send({
      code: -1,
      msg: "页编格式不正确"
    });
    return;
  }
  if (!reg.test(pageSize)) {
    res.send({
      code: -2,
      msg: "页大小格式不正确"
    });
    return;
  }

  var progress = 0;
  var obj = {
    code: 1
  };
  //5:创建sql1 查询总记录数   严格区分大小写
  var sql = "SELECT count(id) AS c FROM xz_news";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    var pageCount = Math.ceil(result[0].c / pageSize);
    progress += 50;
    obj.pageCount = pageCount;
    if (progress == 100) {
      res.send(obj);
    }
  });
  //6:创建sql2 查询当前页内容 严格区分大小写
  var sql = " SELECT id,title,ctime,img_url,point,content FROM xz_news LIMIT ?,?";
  var offset = parseInt(pno - 1) * pageSize;
  pageSize = parseInt(pageSize);
  pool.query(sql, [offset, pageSize], (err, result) => {
    if (err) throw err;
    progress += 50;
    obj.data = result;
    if (progress == 100) {
      res.send(obj);
    }
  })
  //7:返回结果
});
//功能3  查询一条新闻的详细信息
app.get('/NewsInfo', (req, res) => {
  //1  参数
  //2  sql
  var id = req.query.id;
  var sql = 'SELECT id,title,content,img_url,point,ctime FROM xz_news WHERE id=' + id;
  //3  json
  pool.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ code: 1, data: result });
  })
})

//功能4添加评论
app.get("/getcomment", (req, res) => {
  //1:获取参数
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  var nid = req.query.nid;
  //2:设置默认值 1 7
  if (!pno) { pno = 1}
  if (!pageSize) { pageSize = 7}
  //3:创建正则表达式验证用户输入验证
  var reg = /^[0-9]{1,3}$/;
  //4:如果错出停止函数运行
  if (!reg.test(pno)) {res.send({ code: -1,msg: "页编格式不正确" });
    return;
  }
  if (!reg.test(pageSize)) {res.send({code: -2,msg: "页大小格式不正确"});
    return;
  }

  var progress = 0;
  var obj = {code: 1};
  obj.uname = req.session.uname;
  //5:创建sql1 查询总记录数   严格区分大小写
  var sql = "SELECT count(id) AS c FROM xz_comment WHERE nid=?";
  nid = parseInt(nid);
  pool.query(sql,[nid],(err, result) => {
    if (err) throw err;
    var pageCount = Math.ceil(result[0].c / pageSize);
    progress += 50;
    obj.pageCount = pageCount;
    if (progress == 100) {
      res.send(obj);
    }
  });
  //6:创建sql2 查询当前页内容 严格区分大小写
  var sql = " SELECT id,user_name,ctime,content FROM xz_comment WHERE nid=? ORDER BY id DESC LIMIT ?,?";
  var offset = parseInt(pno - 1) * pageSize;
  pageSize = parseInt(pageSize);
  pool.query(sql, [nid,offset,pageSize], (err, result) => {
    if (err) throw err;
    progress += 50;
    obj.data = result;
    if (progress == 100) {
      res.send(obj);
    }
  })
  //7:返回结果
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//功能5  发表评论
app.post('/addComment', (req, res) => {
  var nid = req.body.nid;
  var content = req.body.content;
  var uname = req.session.uname;
  //console.log(nid + ':' + content + ':' + user_name);
  var sql = 'INSERT INTO `xz_comment`(`id`, `nid`, `user_name`, `ctime`, `content`) VALUES(null,?,?,now(),?)';
  nid = parseInt(nid);
  pool.query(sql, [nid,uname,content], (err, result) => {
    if (err) throw err;
    res.send({ code: 1, msg: '评论发表成功' });
  })
})

//功能6   程序商品列表
app.get('/goodsList', (req, res) => {
  var obj = [];
  obj.push({ id: 1, title: '小米', old: 1999, now: 99, img_url: 'http://127.0.0.1:3000/img/banner1.png' });
  obj.push({ id: 2, title: '华为', old: 1999, now: 99, img_url: 'http://127.0.0.1:3000/img/banner2.png' });
  obj.push({ id: 3, title: '苹果', old: 1999, now: 99, img_url: 'http://127.0.0.1:3000/img/banner3.png' });
  obj.push({ id: 4, title: '联想', old: 1999, now: 99, img_url: 'http://127.0.0.1:3000/img/banner4.png' });
  res.send(obj);
});

//功能七:用户登录
app.get("/login", (req, res) => {
  //1:获取参数 uname,upwd
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  //2:创建正则表达式验证
  //3:创建sql
  var sql = "SELECT count(id) as c FROM xz_login WHERE uname = ? AND upwd = md5(?)";
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    var obj = result[0].c;
    if (obj == 1) {
      //7.3  将用户名保存到session中
      req.session.uname = uname;
      res.send({ code: 1,msg: '登录成功' });
    } else {
      res.send({ code: -1, msg: '用户名或者密码错误' })
    }
  })
  //4:返回结果
});

//功能8   添加购物车
app.get("/addCart", (req, res) => {
  //1:获取3个参数
  //需要第三方模块支持 bodyParser
  var uid = req.query.uid;
  var pid = req.query.pid;
  var c = req.query.count;
  //2:创建sql语句
  var sql = " INSERT INTO `xz_shoppingcart_item`(`iid`, `user_id`, `product_id`, `count`, `is_checked`) VALUES (null,?,?,?,0)"

  pool.query(sql, [uid, pid, c], (err, result) => {
    if (err) throw err;
    res.send({
      code: 1,
      msg: "购物车添加成功"
    });
  });
  //3:返回添加结果
})

//功能9   查询购物车明细
app.get('/getCarts', (req, res) => {
  var uid = req.query.uid;
  var sql = 'SELECT c.iid,c.user_id,c.count,p.price,p.lname FROM xz_laptop p, xz_shoppingcart_item c WHERE p.lid=c.product_id AND c.user_id=?'
  uid=parseInt(uid)
  pool.query(sql,[uid], (err, result) => {
    if (err) throw err;
    res.send({code:1,msg:result})
  })
})

//功能10  更新购物车中的数量
app.get('/updateCart', (req, res) => {
  var iid = req.query.iid;
  var count = req.query.count;
  var sql = 'UPDATE xz_shoppingcart_item SET count=? WHERE iid=?'
  iid = parseInt(iid)
  count = parseInt(count);
  pool.query(sql,[count,iid],(err, result) => {
    if (err) throw err
    if (result.affectedRows>0) {
      res.send({ code: 1, msg: '数量修改成功' });
    } else {
      res.send({ code: -1, msg: '数量修改失败' });
    }
  })
})

//功能11   搜索商品
app.get('/Search', (req, res) => {
  var keyword = req.query.keyword;
  var low = req.query.low;
  var high = req.query.high;
  var sql = 'SELECT lid,lname,price FROM xz_laptop WHERE lname LIKE ? AND price>=? AND price<=?'
  low = parseFloat(low);
  high = parseFloat(high);
  pool.query(sql, [`%${keyword}%`, low, high], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: '您搜索的商品不存在' })
    } else {
      res.send({code:1,data:result})
    }
  })
})