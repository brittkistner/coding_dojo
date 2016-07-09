// http server
var http = require('http');

var static_contents = require('./static.js');
//
//creating a server
server = http.createServer(function (request, response){
  console.log("before entering static_contents")
  console.log(request.url)
  static_contents(request, response);
});
server.listen(8000);
console.log("Running in localhost at port 8000");
