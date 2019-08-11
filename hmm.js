var createMsi = require("msi-packager");

var options = {
  // required
  source: "./builds/Party-ify-win32-x64/",
  output: "~/Desktop",
  name: "Party-ify",
  upgradeCode: "10000",
  version: "1.0.0",
  manufacturer: "Aric Zhuang",
  iconPath: "http/public/favicon.ico",
  executable: "./builds/Party-ify-win32-x64/Party-ify.exe",
  // optional
  description: "Yeet urself",
  arch: "x64",
  localInstall: false
};

createMsi(options, function(err) {
  if (err) throw err;
  console.log("Outputed to " + options.output);
});
