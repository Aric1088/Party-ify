$(document).ready(() => {
  getDevices();

  $("#deviceform").submit(e => {
    e.preventDefault();
    let devId = $("#device").val();
    selectDevice(devId);
    fetch("http://localhost:80/ip")
      .then(response => response.json())
      .then(data => {
        $("#ip").empty();
        $("#ip").append(
          "<div><div class='inner'><h3>Party IP: " +
            data +
            ":80" +
            "&nbsp;&nbsp;</h3></div><div class='inner'><input height=20 type='image' src='clipboard.png' size='32px'></div></div>"
        );
        $("#ip").on("click", "input", myFunction);
      });
  });
});

selectDevice = device => {
  let postParams = { deviceId: device };

  $.post("http://localhost:80/selectDevice", postParams, data => {
    console.log(data);
  });
};

getDevices = () => {
  $.get("http://localhost:80/icecoffee/devices", {}, data => {
    fillDropdown(data);
    return data;
  });
};

fillDropdown = list => {
  $.each(list, (i, item) => {
    $("#device").append(new Option(item.name, item.id));
  });
};
