var File = Java.type("java.io.File")
var BufferedReader = Java.type("java.io.BufferedReader")
var FileReader = Java.type("java.io.FileReader")

var BufferedWriter = Java.type("java.io.BufferedWriter")
var FileWriter = Java.type("java.io.FileWriter")
var Runtime = Java.type("java.lang.Runtime")

var Thread = Java.type('java.lang.Thread')
var Scanner = Java.type('java.util.Scanner')

var pastaSpecs = "./app/specs/";

function automator(filename, options) {
  var files = []

  findFiles("./app", files)
  var mapOfTests = readFiles(files)
  writeTestFiles(files, mapOfTests)
  execTests(files)
}

function execTests(files) {
  new Thread(function () {
    Thread.sleep(2000)

    files.forEach(function (file) {
      var nomes = file.getName().split('.');
      directory = new File("");

      var cmd = "thrust " + directory.getAbsolutePath().toString() + "/" + nomes[0] + ".spec.js"

      print(cmd)

      proc = Runtime.getRuntime().exec(cmd)
      input = proc.getInputStream()
      sc = new Scanner(input)
      while (sc.hasNext()) {
        print(sc.next())
      }

    })
  }).start();
}

function writeTestFiles(files, mapOfTests) {
  files.forEach(function (file) {
    writeTestFile(file, mapOfTests[file])
  })
}

function writeTestFile(file, arrayOfTests) {

  var nomes = file.getName().split('.');
  var nomeApi = nomes[0];
  var bw = new BufferedWriter(new FileWriter("./" + nomeApi + ".spec.js"))

  var contents = [];
  contents.push("var majesty = require('majesty')")
  contents.push("var httpClient = require('http-client')")
  contents.push("")
  contents.push("function exec(describe, it, beforeEach, afterEach, expect, should, assert) {")
  contents.push(" var rs")
  contents.push("")


  //aqui monta o test
  arrayOfTests.forEach(function (testCase) {
    
    var url = "http://localhost:8778/app/" + nomeApi + "/" + testCase.endPoint;
    var params = {};
    var result = "";
    var expectedResult = "";
    if(testCase.params != undefined){

      params = JSON.stringify(testCase.params);
    }

    if(testCase.result != undefined){
      result= testCase.result;
      typeResult = typeof result;

      if( typeResult == "string"){
        expectedResult = "      expect(result.body).to.equal('"+result+"')";
      } else {
        expectedResult = "      expect(result.body).to.equal('"+JSON.stringify(result)+"')";
      }
    }


    contents.push("describe('Módulo de testes do hello world', function() {")
    contents.push("")
    contents.push(" describe('API [hello]', function() {")
    contents.push("    it('Realizar chamada no endpoint', function() {")
    contents.push("      var result = httpClient." + testCase.method + "('"+ url +"',"+params+").fetch()")
    contents.push("      expect(result.code).to.equal("+testCase.code+")")
    contents.push(expectedResult)
    contents.push("    })")
    contents.push("  })")
    contents.push("})")
  })

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
  var mapOfTests = {};
  files.forEach(function (file) {
    mapOfTests[file] = getFileSpecJson(file)
  })
  return mapOfTests;
}

function getFileSpecJson(file) {

  var nomeArquivo = file.getName();
  var nomeCortado = nomeArquivo.substring(0, nomeArquivo.length() - 3);
  var arquivoMaisPasta = pastaSpecs + nomeCortado + ".spec.json";

  var novoArquivo = new File(arquivoMaisPasta);

  if (novoArquivo.isFile()) {
    
    return readFile(novoArquivo);
  
  } else {
    print("Não foi encontrado o arquivo " + novoArquivo);

    return false;
  }
}

/**
 *
 * @param {*} file
 */
function readFile(file) {

  var linhas = '';
  var reader = new BufferedReader(new FileReader(file));

  var s;
  while ((s = reader.readLine()) != null) {
    linhas = linhas.concat(s)
  }

  reader.close()

  return JSON.parse(linhas)
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