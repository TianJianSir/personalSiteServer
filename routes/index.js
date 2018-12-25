module.exports = function (app) {
    let user = require('../api/user')
    app.use('/api/user', user)

    let post = require('../api/post')
    app.use('/api/post', post)

    let token = require('../api/token')
    app.use('/api/token', token)
}
