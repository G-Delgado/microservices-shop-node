import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import amqp from "amqplib";
import { Kafka } from "kafkajs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// RabbitMQ Config
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
let rabbitChannel: amqp.Channel;

async function connectRabbitMQ() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    rabbitChannel = await conn.createChannel();
    await rabbitChannel.assertQueue("notifications");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
  }
}

// Kafka Config
const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const kafkaProducer = kafka.producer();
async function connectKafka() {
  await kafkaProducer.connect();
  console.log("Connected to Kafka");
}

app.get("/", (req, res) => res.send("Notification Service Running"));

app.listen(3003, async () => {
  console.log("Notification Service on port 3003");
  await connectRabbitMQ();
  await connectKafka();
});
