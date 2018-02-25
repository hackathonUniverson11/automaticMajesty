var majesty = require('majesty')
var httpClient = require('http-client')

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {
 var rs

describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.POST('http://localhost:8778/app/helloWorld/hello',[{"nome":"Felipe","empresa":"Softbox"}]).fetch()
      print(JSON.stringify(result))
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('Hello Felipe from Softbox')
    })
  })
})
describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.GET('http://localhost:8778/app/helloWorld/hello',[{"id":1}]).fetch()
      print(JSON.stringify(result))
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('{"id":1,"nome":"Felipe","endereco":"Rua mantova"}')
    })
  })
})
}
var res = majesty.run(exec)
print('', res.success.length, ' scenarios executed with success and')
print('', res.failure.length, ' scenarios executed with failure.') 
res.failure.forEach(function(fail) {
print('[' + fail.scenario + '] =>', fail.execption)
if (fail.execption.printStackTrace) { 
fail.execption.printStackTrace()
} 
})
