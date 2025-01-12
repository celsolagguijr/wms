import { Request, Response } from "express"
import PickingSlipService from "../services/PickingSlipService";
import handleErrors from "../helpers/handleErrors";
import HttpStatus from "../shared/HttpStatus";

class PickingSlipController {

    private pickingSlipService;

    constructor() {
        this.pickingSlipService = new PickingSlipService();
    }


    async getPickingSlip(req: Request, res: Response): Promise<void> {

        // blank status means all data
        const status = req.query.status as "" | "printed" | "not_printed" | "held" ?? "";

        // default page is 1
        const page = parseInt(req.query.page as string, 10) || 1;

        // default limit is 1
        const limit = parseInt(req.query.limit as string, 10) || 100;


        try {
            const result = await this.pickingSlipService
                .getPickingSlips(
                    status,
                    page - 1,
                    limit
                );
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                data: result
            });
        } catch (error) {
            const err = handleErrors(error);
            res.status(err.status).json(err)
        }
    }


}


export default PickingSlipController;