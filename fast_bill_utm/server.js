/*var http = require('http')
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);
*/
var port = process.env.PORT || 1337;





// global.config = require("./app.config.js");

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=port; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}



var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(PORT);
