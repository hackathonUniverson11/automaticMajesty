let server = require('http')
let router = require('router')
let automator = require('/automator')
automator()

server.createServer(8778, router)

