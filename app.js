var koa = require('koa');
var app = koa();

app.use(function *() {
	this.body = 'hello world.'
});

app.listen(4000, function() {
	console.log('tuanzll running on 4000.');
});