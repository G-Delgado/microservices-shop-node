import express, {Request, Response} from "express";
import cors from "cors";
import "reflect-metadata";
import { DataSource } from "typeorm";

const app = express();
app.use(cors());
app.use(express.json());

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

app.get("/", (req: Request, res: Response) => res.send("User Service Running"));

app.listen(3001, () => console.log("User Service on port 3001"));