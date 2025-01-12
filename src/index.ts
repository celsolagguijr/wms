import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { AppDataSource } from "./config/AppSourceData";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.options('*', cors());

app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// all routes here
app.use("/api", routes);


AppDataSource.initialize().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
}).catch(err => {
    throw new Error(err);
})




