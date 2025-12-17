const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
    start() {
        this.emit("start");

        setTimeout(() => {
            this.emit("finish");
        }, 2000);
    }
}

let MyProcess = new MyEmitter();

MyProcess.on("start", () => {
    console.log("started...");
});

MyProcess.on("finish", () => {
    console.log("finished...");
});

MyProcess.start();