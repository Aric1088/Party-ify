setInterval(() => {
    let sentTime = (new Date).getTime();
    fetch("/icecoffee/time")

        .then(response => response.json())
        .then(data => {
            let received = data.received;
            let sent = data.sent;
            let current_time = (new Date).getTime();
            let totalOffset = (received - sentTime) + (sent - current_time);
            let calculated_offset = totalOffset / 2;
            let delay = ((current_time - sentTime) - (sent - received)) / 2;
            calculated_offset -= delay;
            let ceilServerTime = Math.ceil((received) / 1000) * 1000;
            // console.log([calculated_offset, ceilServerTime, received, delay])
            //100 ms allow the player to buffer ever so slightly more :)
            postMessage([calculated_offset, ceilServerTime, received, delay]);
        })
}, 500);
