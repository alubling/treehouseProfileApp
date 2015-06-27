// Problem: We need a simple way to look at a user's badegcount and Javascript points from a web browser
// Solution: User Node.js to perform the profile lookups and serve our templates via HTTP

// require router.js file where the route handlers are located
var router = require("./router.js");



// 1. Create a Web Server

var http = require('http');
http.createServer(function (request, response) {
  router.home(request, response); // home route handler
  router.user(request, response); // user route handler
}).listen(1337, '127.0.0.1'); // this needs to be (1337, '127.0.0.1'); for local machines but for workspaces there is a specific port you can set it to
console.log('Server running at http://<workspace-url>/');
