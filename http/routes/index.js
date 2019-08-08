const log = require("electron-log");
log.transports.console.level = "info";
log.transports.file.level = "info";

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  log.info("serving home page...");
  res.render("index");
});

module.exports = router;
