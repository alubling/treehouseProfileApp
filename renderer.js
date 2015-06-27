// 4. Function that handles the reading of files and merges in values (to HTML form)
  // Read from file and get a string
    // merge values into string

    // Read from the template file
    // Insert values into the content
    // Write out to the response

var fs = require("fs");


function mergeValues(values, content) {
  // Cycle over the keys of the values
  for (var key in values) {
    // Replace all {{key}} with the value from the values object
    content = content.replace("{{" + key + "}}", values[key]); // what's going on here is we're searching for the equivalent key as a string in the content, then we're replacing it with that key's real value in the values object.
  }
  // return merged content
  return content;

}


function view(templateName, values, response) {
  // Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
  // Insert values in to the content
  fileContents = mergeValues(values, fileContents); // just separate this step into a function to merge the values into the file
  // Write out the contents to the response
  response.write(fileContents);


}

module.exports.view = view;
