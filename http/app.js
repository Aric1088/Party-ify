const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("winston");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require(path.join(__dirname, "routes", "index"));
const users = require(path.join(__dirname, "routes", "users"));
const icecoffee = require(path.join(__dirname, "routes", "icecoffee"));

const app = express();
const ip = require("ip");

const http = require("http").Server(app);
const io = require("socket.io")(http);
const portAudio = require("naudiodon");
const readline = require("readline");
let bufferStream;
//Intialization of buffer stream

//Some Global Variables
let clients = 0;
let broadcaster;
let started = false;
let currentSet = 2;
let systemAudio;
let prevSet = currentSet;
let ready = false;
let buffer;
let debug = false;

//HYPER Paramters
const numSeconds = 3;
const port = 3000;

const print = msg => {
  if (debug) {
    console.log(msg);
  }
};

const switchAudioDevice = async deviceId => {
  try {
    started = false;
    if (deviceId === undefined) {
      deviceId = currentSet;
    }
    prevSet = currentSet;
    currentSet = deviceId;
    initialize_audio(deviceId);
    return "Switched to device " + deviceId;
  } catch (e) {
    currentSet = prevSet;
    switchAudioDevice(prevSet);
    return "Error";
  }
};
const initialize_audio = async deviceId => {
  if (systemAudio) {
    await systemAudio.destroy();
  }
  systemAudio = null;
  if (bufferStream) {
    await bufferStream.destroy();
  }
  bufferStream = null;
  let allDevices = portAudio.getDevices();
  device = allDevices[deviceId];
  print("creating new device " + device.name);
  systemAudio = new portAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: portAudio.SampleFormat16Bit,
      sampleRate: 48000,
      deviceId: device.id // Use -1 or omit the deviceId to select the default device
    }
  });
  systemAudio.on("end", () => {
    currentSet = prevSet;
    print("Switching back to " + prevSet);
    started = false;
    print("Attempting to restart...");
    switchAudioDevice(prevSet);
  });
  systemAudio.on("error", err => {
    started = false;
    print(err);
    print("cyka");
  });
  bufferStream = new require("stream").Transform();
  bufferStream._transform = function(chunk, encoding, done) {
    this.push(chunk);
    done();
  };
  systemAudio.pipe(bufferStream);
};
const tearDown = () => {};
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/icecoffee", icecoffee);
app.post("/selectDevice", async (req, res) => {
  print(req.body.deviceId);
  if (req.body.deviceId) {
    res.json(await switchAudioDevice(req.body.deviceId));
  }
});
app.use("/clients", (req, res) => {
  res.json(clients);
});
app.get("/ip", (req, res) => {
  res.json(ip.address());
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

io.on("connection", async socket => {
  clients += 1;
  print("Clients: " + clients);
  if (!started && clients > 0) {
    broadcaster = setInterval(async () => {
      if (systemAudio && bufferStream) {
        print("loop");
        if (!started) {
          await systemAudio.start();
          started = true;
          print("restarted!");
        }
        bufferStream.read(9999999999999);
        buffer = bufferStream.read(192000 * numSeconds);
        time = new Date().getTime() + 2000;

        io.emit("chat message", {
          type: 1,
          payload: {
            time: time,
            chunky: buffer ? buffer.buffer : []
          }
        });
      }
    }, numSeconds * 1000);
  }
  socket.on("disconnect", () => {
    clients -= 1;
    print("Clients: " + clients);
  });
});

module.exports = http;
