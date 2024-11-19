const mqtt = require('mqtt')
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


const client = mqtt.connect(options);

client.on('connect', (error) => {

  if (error) {
    console.error(error)
  }

  console.log('Connected')

  client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (err) => {
    if (err) {
      console.error('Failed to publish message:', err);
    } else {
      console.log('Message published');
    }
  });

})
