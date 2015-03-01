function Payment() {
	this.name = 'hello world!';
}

Payment.prototype.getName = function() {
	console.log(this.name);
}

var p = new Payment();
p.getName();
