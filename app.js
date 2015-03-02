var koa        = require('koa');
var render     = require('koa-ejs');
var path       = require('path');
var serve      = require('koa-static');
var bodyParser = require('koa-body-parser');
var router     = require('./router/');
var app        = koa();

app.use(bodyParser());

app.use(serve(path.join(__dirname, 'public')));

render(app, {
	root: path.join(__dirname, 'views'),
	layout: 'layout',
	viewExt: 'html',
	cache: false,
	debug: true
});

router(app);

app.listen(4001, function() {
	console.log('server running on 4001.');
});