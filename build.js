var zip = require("bestzip");

zip({
  source: [
    "index.js",
    "logo.png",
    "package-lock.json",
    "package.json",
    "SETUP.bat",
    "START.bat",
    "STOP.bat"
  ],
  destination: "./zip/pba-client.zip"
})
  .then(function() {
    console.log("File succesfully zipped");
  })
  .catch(function(err) {
    console.error(err.stack);
    process.exit(1);
  });
