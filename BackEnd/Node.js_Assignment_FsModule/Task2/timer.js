const EventEmitter = require("events");

class Timer extends EventEmitter {
  start() {
    let count = 0;

    const intervalId = setInterval(() => {
      count++;
      
      this.emit("tick", count);

      if (count === 5) {
        this.emit("done");
        clearInterval(intervalId);
      }

    }, 1000);
  }
}

const timer = new Timer();

timer.on("tick", (num) => {
  console.log(`Tick ${num}`);
});

timer.on("done", () => {
  console.log("Timer finished after 5 ticks.");
});

timer.start();
