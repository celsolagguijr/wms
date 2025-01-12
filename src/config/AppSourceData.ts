import { DataSource } from "typeorm";
import { PickingSlip } from "../entities/PickingSlip";
import { PickingSlipItem } from "../entities/PickingSlipItem";
import { PickingSlipDate } from "../entities/PickingSlipDate";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    port: Number(process?.env?.DB_PORT || 3306),
    database: process.env.DB_NAME,
    synchronize: true,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    logging: true,
    entities: [PickingSlip, PickingSlipItem, PickingSlipDate],
    subscribers: [],
    migrations: []
})