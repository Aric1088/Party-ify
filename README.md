# Party-ify : Live Music Streaming Server
Wireless multi-speaker solution for parties, events, and celebratory occasions

- Supports Synchronized Simultaneous Playback Across Multiple Clients
- Any Internet Enabled Device with a Browser Can Connect and Stream

![Image description](https://i.ibb.co/WDWcr8t/Screen-Shot-2019-08-08-at-2-42-35-AM.png)

### Prerequisites

What things you need to install the software and how to install them

The latest version of the Node runtime environment: [Download](https://nodejs.org/en/download/) 


### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the repository to a folder
2. Execute "npm run start", this will start the electron app
3. In the case that any dependencies are missing, run "npm install"

4. In order for the server to stream audio, it requires an input audio source to read from. This could be a microphone device, or a virtual sound driver that captures system audio.
5. For Windows, I recommend Virtual Cable Audio; it works really well and is easy to setup: https://www.vb-audio.com/Cable/
For Mac, soundflower is a good solution: https://rogueamoeba.com/freebies/soundflower/
On Linux, using either ALSA or PulseAudio, you can create a virtual sound sink.



## Deployment

1. To stream from a device, open the device's browser and connect to the ip address.
2. All of your devices' playback should be in sync - a great solution for multi-room audio setups, parties, or when you just simply don't have enough aux cable splitters for all your speakers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

