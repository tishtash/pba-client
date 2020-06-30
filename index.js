const notifier = require("node-notifier");
const path = require("path");
const client = require("socket.io-client")("https://pba.myliveeye.com", {
  path: "/alert/socket.io",
  reconnectionDelay: 30000,
  randomizationFactor: 2
});

client.on("store-alert", function(data) {
  const options = {
    title: "Live Eye Surveillance",
    subtitle: "Push Button Alert",
    message: `${data.store_name} - Requesting Assistance.`,
    icon: path.join(__dirname, "logo.png"),
    sound: "Notification.Looping.Alarm"
  };
  console.log(
    `Date:: ${new Date()}\nStore:: ${
      data.store_name
    }\nMessage:: Requesting Assistance\n`
  );
  try {
    notifier.notify(options);
  } catch (err) {
    console.log(err);
  }
});

client.on("connect", function() {
  console.log(`${new Date()}::Connnected With the Server`);
  const options = {
    title: "Live Eye Surveillance",
    subtitle: "Success",
    message: `Connected with the server`,
    icon: path.join(__dirname, "logo.png"),
    sound: "Notification.Looping.Alarm"
  };
  try {
    notifier.notify(options);
  } catch (err) {
    console.log(err);
  }
});
client.on("disconnect", function() {
  console.log(`${new Date()}::Application Disconnected`);
  const options = {
    title: "Live Eye Surveillance",
    subtitle: "Failure",
    message: `Disconnected with the server`,
    icon: path.join(__dirname, "logo.png"),
    sound: "Notification.Looping.Alarm2"
  };
  try {
    notifier.notify(options);
  } catch (err) {
    console.log(err);
  }
});

client.on("connect_error", () => {
  console.log(`${new Date()}::Alert Server is Unavailable.`);
  const options = {
    title: "Live Eye Surveillance",
    subtitle: "Failure",
    message: `Push Button Alert Server is Unavailable.`,
    icon: path.join(__dirname, "logo.png"),
    sound: "Notification.Looping.Alarm3"
  };
  try {
    notifier.notify(options);
  } catch (err) {
    console.log(err);
  }
});
