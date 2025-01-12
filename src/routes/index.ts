import { Router } from "express";
import pickingSlipRouter from "./pickingslip.route";

const routes = Router();

routes.use("/v1/picking-slips", pickingSlipRouter);

export default routes;