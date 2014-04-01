var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/MEAN-BLOG');  // 连接数据库，记得要启动mongodb数据库哦

// 建立文章schema
var PostSchema = new Schema({
    title: String,
    content: String,
    comments: [{comment: String}],
    date: {type: Date, default: Date.now()}
});

// 建立文章model
var Post = mongoose.model('Post', PostSchema);

module.exports = function (app) {

	// 输出文章列表
	// 并按时间排序
    app.get('/posts', function (req, res) {
        Post.find({}).sort({date: -1}).exec(function (err, docs) {
            res.json(docs);
        });
    });

    // 接收并保存文章到数据库
    app.post('/post/add', function (req, res) {
        var post = new Post(req.body);

        post.save(function (err, docs) {
            res.json({status: 'done'});
        });
    });

    // 根据获取的_id，输出对应的文章
    // 评论是包含在文章的JSON里面的，无需另外获取
    app.get('/post/:_id', function (req, res) {
        var _id = req.params._id;

        Post.findOne({_id: _id}).exec(function (err, docs) {
            res.json(docs);
        });
    });

    // 存储文章对应的评论
    app.post('/post/:_id/comment', function (req, res) {
        var _id = req.params._id,
            comment = req.body;

        Post.update({_id: _id}, {$push: {comments: comment}}).exec(function (err, docs) {
            res.json({status: 'done'});
        });
    });

    // 其他任何未定义的路由情况都默认输出 index.html 页面
    app.get('*', function (req, res) {
        res.sendfile('app/index.html');
    });
    
};