var majesty = require('majesty')
var httpClient = require('http-client')

function exec(describe, it, beforeEach, afterEach, expect, should, assert) {
 var rs

describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.post('http://localhost:8778/app/helloWorld/helloBasic',"").fetch()
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('Hello')
    })
  })
})
describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.put('http://localhost:8778/app/helloWorld/putById',"").fetch()
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('1')
    })
  })
})
describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.delete('http://localhost:8778/app/helloWorld/deleteById',"").fetch()
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('1')
    })
  })
})
describe('Módulo de testes do hello world', function() {

 describe('API [hello]', function() {
    it('Realizar chamada no endpoint', function() {
      var result = httpClient.get('http://localhost:8778/app/helloWorld/getById',"").fetch()
      expect(result.code).to.equal(200)
      expect(result.body).to.equal('1')
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
