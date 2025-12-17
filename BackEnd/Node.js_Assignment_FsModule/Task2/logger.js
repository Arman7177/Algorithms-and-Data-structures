const fs = require('fs');
const MyEmitter = require('events');

class Emitter extends MyEmitter {
  start() {
    this.emit('info',  'Application started');
    this.emit('warn',  'Memory usage is high');
    this.emit('error', 'Cannot connect to database');
  }
}
const logger = new Emitter();

function logToFile(filename, level, message) {
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}\n`;
  fs.appendFileSync(filename, line, 'utf8');
}

logger.on('info', (msg) => {
  console.log('INFO:', msg);
  logToFile('info.log', 'info', msg);
});

logger.on('warn', (msg) => {
  console.log('WARN:', msg);
  logToFile('warn.log', 'warn', msg);
});

logger.on('error', (msg) => {
  console.log('ERROR:', msg);
  logToFile('error.log', 'error', msg);
});

logger.start()