const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// ✅ Update the COM port according to your system (Check Device Manager)
const PORT_NAME = 'COM9'; // Change this if necessary

if (!PORT_NAME) {
    console.error("Error: Serial Port not specified.");
    process.exit(1);
}

// ✅ Open Serial Port
const port = new SerialPort({ path: PORT_NAME, baudRate: 9600 });
const parser = port.pipe(new ReadlineParser());

// ✅ Values to send in a loop
const values = [40,70,120,170,145,70];
let index = 0;

// ✅ Ensure the port is open before writing
port.on('open', () => {
    console.log(`✅ Serial Port ${PORT_NAME} Opened`);

    setInterval(() => {
        let value = values[index]; // Pick the current value

        port.write(value + "\n", (err) => {
            if (err) {
                return console.log('❌ Error writing to port:', err);
            }
            console.log('📤 Sent:', value);
        });

        index = (index + 1) % values.length; // Cycle through values
    }, 5000);
});

// ✅ Listen for responses from Arduino
parser.on('data', (data) => {
    console.log('📥 Received from Arduino:', data.trim());
});

// ✅ Handle errors
port.on('error', (err) => {
    console.log('❌ Serial Port Error:', err.message);
});
