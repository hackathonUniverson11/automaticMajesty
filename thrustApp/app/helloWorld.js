let dbm = require('database')

let dbConfig = getBitcodeConfig('database')()
let db = dbm.createDbInstance(dbConfig)
/**
 *
 * @param {*} params
 * @param {*} request
 * @param {*} response
 */
function hello (params, request, response) {
  response.write('Hello, you sent me the following params: ' + JSON.stringify(params))
}

function helloBasic (params, request, response) {
  response.write('Hello')
}

function helloDb (params, request, response) {
  response.write(db.select('select * from tabela'))
}
function putById (params, request, response) {
  response.write(1)
}

function deleteById (params, request, response) {
  response.write(1)
}

function getById (params, request, response) {
  response.write(1)
}

exports = {
  hello: hello,
  helloDb: helloDb,
  helloBasic: helloBasic ,
  getById:getById,
  deleteById:deleteById,
  putById:putById 
}
