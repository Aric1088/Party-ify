const log = require("electron-log");
const portAudio = require("naudiodon");
log.transports.console.level = "info";
log.transports.file.level = "info";

const express = require("express");
const router = express.Router();

const listDevices = () => {
  let allDevices = portAudio.getDevices();
  let devices = [];
  for (device in allDevices) {
    if (allDevices[device] && allDevices[device].maxInputChannels > 0) {
      devices.push(allDevices[device]);
    }
  }
  return allDevices;
};

/* GET home page. */
router.get("/", function(req, res, next) {
  log.info("serving home page...");
  res.render("index");
});

router.get("/time", (req, res) => {
  received = new Date().getTime();
  res.json({
    received: received,
    sent: received
  });
});

router.get("/devices", (req, res) => {
  res.send(listDevices());
});

module.exports = router;
