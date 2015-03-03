var User = require('../../model/index.js');

module.exports = function *() {
    var users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
    yield this.render('body', {
        users: users
    });
}