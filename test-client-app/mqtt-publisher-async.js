const mqtt = require("async-mqtt")
const fs = require('fs');

const clientId = `mqtt_iot_client_${Math.random().toString(16).slice(3)}`

// Load the .env file if it exists
require("dotenv").config();

const mqttHost = process.env["MQTT_HOSTNAME"] || "";
const caChainFilePath = process.env["CA_CHAIN_FILE_PATH"] || "../ca/certs/intermediate_ca.crt";
const certChainFilePath = process.env["CERT_FILE_PATH"] || "../client1-authn-ID.crt";
const keyChainFilePath = process.env["KEY_FILE_PATH"] || "../client1-authn-ID.key";
const topic = process.env.MQ_TOPIC || "nodejs/test"

// Using certificates
const options = {
    protocol: 'mqtts',
    protocolVersion: 5,
    host: mqttHost,
    port: 8883,
    ca: [fs.readFileSync(caChainFilePath)],
    cert: fs.readFileSync(certChainFilePath),
    key: fs.readFileSync(keyChainFilePath),
};



async function run() {

    try {

        const client = await mqtt.connectAsync(options);

        await client.publish(topic, 'nodejs mqtt test async', { qos: 0, retain: false });

        await client.end();
        console.log("Message published");

    } catch (error) {

    		// Do something about it!
		    console.log(e.stack);
		    process.exit();
    }
}

run();