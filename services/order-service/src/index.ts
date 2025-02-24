import express from "express";
import cors from "cors";
import "reflect-metadata";
import { DataSource } from "typeorm";

const app = express();
app.use(cors());
app.use(express.json());

/*
const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "users_db",
    synchronize: true,
    entities: [],
});

AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Error connecting to database", err));
*/
app.get("/", (req, res) => res.send("Order Service Running"));

app.listen(3002, () => console.log("Order Service on port 3002"));