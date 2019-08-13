# Party-ify : Live Wireless Distributed Music Streaming Solution
Wireless distributed multi-speaker solution for parties, events, and celebratory occasions

- Supports Synchronized Simultaneous Playback Across Multiple Clients
- Any Internet Enabled Device with a Browser Can Connect and Stream

![Image description](https://i.ibb.co/WDWcr8t/Screen-Shot-2019-08-08-at-2-42-35-AM.png)

# How Audio Synchronization Works

## Clock Synchronization

All devices connected to the server must refer to the server time as a source of truth in order to perform timestamp dependent operations. 

In this specific situation, the server acts as ntp server, where clients continually ping the server to determine the correct offset in which to synchronize their clocks too.

The offset algorithm can be seen below:

<a href="https://www.codecogs.com/eqnedit.php?latex=\Delta&space;=&space;[(T2&space;-&space;T1)&space;&plus;&space;(T3&space;-&space;T4)]&space;/&space;2" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Delta&space;=&space;[(T2&space;-&space;T1)&space;&plus;&space;(T3&space;-&space;T4)]&space;/&space;2" title="\Delta = [(T2 - T1) + (T3 - T4)] / 2" /></a>

We define the following variables:

T1: Origin Timestamp: The timestamp of the client upon departure of the client's request\
T2: Receive Timestamp: The timestamp of the server upon receiving the client's request\
T3: Transmit Timestamp: The timestamp of the server upon departure of the server's reply\
T4: Destination Timestamp: The timestamp of the client upon receiving the server's reply

We can then add this offset to the client time to obtain a theoretical synchronized time.

## Latency Synchronization

Because network packets are received by clients at different times due to being on different networks or because of network traffic, latency must be accounted for to correctly synchronize audio playback.

To calculate the latency, we apply the below calculation with the previously defined variables:


<a href="https://www.codecogs.com/eqnedit.php?latex=\Delta&space;=(T4&space;-&space;T1)&space;-&space;(T3&space;-&space;T2)" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Delta&space;=(T4&space;-&space;T1)&space;-&space;(T3&space;-&space;T2)" title="\Delta =(T4 - T1) - (T3 - T2)" /></a>


If one client receives a packet before another, it must wait a certain amount of time such that it's playback matches with the client which receives the packet at a later time. To put our latency calculation to use, let us imagine the following senario:


- Client A receives a packet 2 seconds after server transmission.
- Client B receives a packet 1 second after server transmission.


If we specify a global buffer time, or rather, assuming 0 latency, a client should wait x number of seconds before playing the data packet they have received, than we can apply the following synchronizations.

Given that client A has a latency of 2 seconds and client B has a latency of 1 second, 
client A must readjust it's wait time to be x - 2 and client B must readjust it's wait time to be x - 1.

A concrete example would help illustrate why this makes sense.

- Client A receives a packet at time 2.
- Client B receives a packet at time 1.

Assuming global buffer time is 3 seconds, with the aforementioned calculation:

- Client A will wait 3 - 2 seconds, starting playback at time 2 + 1 = 3.
- Client B will wait 3 - 1 seconds, starting playback at time 1 + 2 = 3.

As we can see, the clients both start playback at the sametime.

The limiting factor to this synchronization working in theory is the global buffer time.\
As long as the max latency among all the clients remain within global buffer time, then
the amount each client has to wait will always be greater than 0, guaranteeing synchronized playback.
Conversely, if a client has a greater latency than the global buffer time, and we cannot do the reverse of delaying(as the latency offset would now be negative), the algorithm would not work in this case.


## Prerequisites

What things you need to install the software and how to install them

The latest version of the Node runtime environment: [Download](https://nodejs.org/en/download/) 


## Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the repository to a folder
2. Execute "npm run start", this will start the electron app
3. In the case that any dependencies are missing, run "npm install"

4. In order for the server to stream audio, it requires an input audio source to read from. This could be a microphone device, or a virtual sound driver that captures system audio.
5. For Windows, I recommend Virtual Cable Audio; it works really well and is easy to setup: https://www.vb-audio.com/Cable/ An alternative would be to use Window's builtin Audio Recording API: stereo-mix
6. For Mac, soundflower is a good solution: https://rogueamoeba.com/freebies/soundflower/
On Linux, using either ALSA or PulseAudio, you can create a virtual sound sink.



## Deployment

1. To stream from a device, open the device's browser and connect to the ip address.
2. All of your devices' playback should be in sync - a great solution for multi-room audio setups, parties, or when you just simply don't have enough aux cable splitters for all your speakers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

