var request = require('request');

function User(user) {
    this.name = user.name;
    this.password = user.password;
}

User.prototype.save = function() {
    // 获取数据
}