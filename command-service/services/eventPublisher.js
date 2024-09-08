const { Kafka } = require('kafkajs');

const param= {
    brokers: ['kafka:9092'], // Replace with your Kafka broker address
  }
  console.log("param data", param);
const kafka = new Kafka(param);
// Initialize the producer
const producer = kafka.producer({
  allowAutoTopicCreation:true
});



const publishEvent = async (eventType, payload) => {
  await producer.connect();
  console.log("Producer connected");
  const event = { eventType, payload };
  const buffer = Buffer.from(JSON.stringify(event));
  console.log("Event data", event, payload, buffer);

  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await producer.send({
        topic: 'blog-events',
        messages: [{ value: buffer }],
      });
      console.log('Event published:', eventType);
      break;
    } catch (error) {
      attempt++;
      console.error(`Error sending event (attempt ${attempt}):`, error);
      if (attempt >= maxRetries) {
        console.error('Max retries reached. Could not publish event.');
      } else {
        // Wait for a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
};


module.exports = { publishEvent };
