const { Kafka } = require('kafkajs');
const BlogQuery = require('../models/BlogQuery'); // Ensure this is correctly imported

const kafka = new Kafka({
  brokers: ['kafka:9092'], // Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'blog-query-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'blog-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Consumer message:', event);

      if (event.eventType === 'BLOG_CREATED') {
        console.log('Handling BLOG_CREATED event');
        const { blog } = event.payload;
        blog.postgres_id= blog.id;
        delete blog.id;
        console.log("data blog insert", blog)
        await new BlogQuery(blog).save(); // Save to query database
      } else if (event.eventType === 'BLOG_DELETED') {
        console.log('Handling BLOG_DELETED event');
        const { blog } = event.payload;
        await BlogQuery.findOneAndDelete({ postgres_id: blog.id }); // Remove from query database
      }
    },
  });
};
module.exports= {runConsumer}

