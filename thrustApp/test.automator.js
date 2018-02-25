var File = Java.type("java.io.File")
var BufferedReader = Java.type("java.io.BufferedReader")
var FileReader = Java.type("java.io.FileReader")

var BufferedWriter = Java.type("java.io.BufferedWriter")
var FileWriter = Java.type("java.io.FileWriter")
var Runtime = Java.type("java.lang.Runtime")

var Thread = Java.type('java.lang.Thread');
var Scanner = Java.type('java.util.Scanner')

function automator(filename, options) {
  var files = []
  findFiles("./app", files)
  readFiles(files)
  writeTestFiles(files)
  execTests(files)
}


function execTests(files) {
  new Thread(function () {
    Thread.sleep(5000)

    files.forEach(function (file) {
      var nomes = file.getName().split('.');
      directory = new File("");

      var cmd = "thrust " + directory.getAbsolutePath().toString() + "/" + nomes[0] + ".spec.js"

      print(cmd)

      proc = Runtime.getRuntime().exec(cmd)
      input = proc.getInputStream()
      sc = new Scanner(input)
      while(sc.hasNext()){
        print(sc.next())
      }

    })
  }).start();
}

function writeTestFiles(files) {
  files.forEach(function (file) {
    writeTestFile(file)
  })
}

function writeTestFile(file) {

  var nomes = file.getName().split('.');


  var bw = new BufferedWriter(new FileWriter("./" + nomes[0] + ".spec.js"))

  var contents = [];
  contents.push("var majesty = require('majesty')")
  contents.push("var httpClient = require('http-client')")
  contents.push("")
  contents.push("function exec(describe, it, beforeEach, afterEach, expect, should, assert) {")
  contents.push(" var rs")
  contents.push("")


  //aqui monta o test
  contents.push("describe('Módulo de testes do hello world', function() {")
  contents.push("")
  contents.push(" describe('API [hello]', function() {")
  contents.push("    it('Realizar chamada no endpoint', function() {")
  contents.push("      var result = httpClient.post('http://localhost:8778/app/helloWorld/hello').fetch()")
  contents.push("      print(JSON.stringify(result))")
  contents.push("      expect(result.code).to.equal(200)")
  contents.push("      expect(result.body).to.equal('Hello, you sent me the following params: {}')")
  contents.push("    })")
  contents.push("  })")
  contents.push("})")
  contents.push("}")

  //aqui termina

  contents.push("var res = majesty.run(exec)")
  contents.push("print('', res.success.length, ' scenarios executed with success and')")
  contents.push("print('', res.failure.length, ' scenarios executed with failure.') ")
  contents.push("res.failure.forEach(function(fail) {")
  contents.push("print('[' + fail.scenario + '] =>', fail.execption)")
  contents.push("if (fail.execption.printStackTrace) { ")
  contents.push("fail.execption.printStackTrace()")
  contents.push("} ")
  contents.push("})")

  contents.forEach(function (content) {
    bw.write(content)
    bw.newLine()
  })

  bw.close();

}

/**
 *
 * @param {*} files
 */
function readFiles(files) {
  files.forEach(function (file) {
    readFile(file)
  })
}

/**
 *
 * @param {*} file
 */
function readFile(file) {

  var linhas = [];
  var reader = new BufferedReader(new FileReader(file));

  var s;
  while ((s = reader.readLine()) != null) {

    if(s.match(/(\w)+(\s*):(\s*)(\w+)/g)){
      print("Match do regex --> " + s)
      linhas.push(s)
    }
  }

  reader.close()
}

/**
 *
 * @param {*} directoryName
 * @param {*} files
 */
function findFiles(directoryName, files) {
  directory = new File(directoryName);

  var fList = directory.listFiles();

  if (fList !== null) {
    Java.from(fList).forEach(function (file) {
      if (file.isFile()) {
        if (file.getName().endsWith('.js')) {
          print("arquivos encontrado: " + file.getName() + " \n")
          files.push(file);
        }
      } else if (file.isDirectory()) {
        findFiles(file.getPath(), files);
      }
    });
  }
}

exports = automator
