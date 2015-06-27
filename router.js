var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'}; // so we swapped out text/plain with text/html

// 2. Handle HTTP route GET / and POST / i.e. Home

function home(request, response) {
  // if the url == "/" && GET (if you're home and it's a 'GET' request)
  if(request.url === "/") {
    if(request.method.toLowerCase() === "get") {
    // show the search field
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response); // now use the renderer view
      renderer.view("search", {}, response); // now we use the renderer file's view function
      renderer.view("footer", {}, response); // same as above
      response.end();
    } else { // if the request is not "get" but "post"
      // if the url == "/" && POST (if you're home and it's a 'POST' request

      // get the post date from body
      request.on("data", function(postBody) { // data event returns postBody as a buffer, so you need to convert it to a string
        console.log(postBody.toString()); // returns username=amitlubling (or any other username)
        // extract the username
        var query = querystring.parse(postBody.toString());
        // redirect to /:username
        response.writeHead(303, {"Location": "/" + query.username });
        response.end();

      });
    }
  }


}

// 3. Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  // if the url == "/..."
  var username = request.url.replace("/", ""); // for username replace the / in the url with an empty string, then make sure it's longer than an empty string
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    renderer.view("header", {}, response);;

    // get json from Treehouse (per the example_profile.js file
    var studentProfile = new Profile(username);
      // on "end"
      studentProfile.on("end", function(profileJSON) {
        // show the profile

        // store the values we need
        var values = {
          avatarUrl: profileJSON.gravatar_url, // if you look at the JSON directly, you can see that on the JSON object you use .gravatar_url as the key to access that value
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length, // badges is an array
          javascriptPoints: profileJSON.points.JavaScript
        }
        // Simple response
        renderer.view("profile", values, response); // now response is from view and we pass in the values above
        renderer.view("footer", {}, response);
        response.end();
      });

      // on "error"
      studentProfile.on("error", function(error) {
        // show the error
        renderer.view("error", {errorMessage: error.message}, response); // error has a property called message we can use
        renderer.view("search", {}, response);
        renderer.view("footer", {}, response);
        response.end();
      });

  }
}

module.exports.home = home;
module.exports.user = user;
