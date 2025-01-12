

import { AppDataSource } from "../config/AppSourceData";
import { PickingSlip } from "../entities/PickingSlip";
import { PickingSlipDate } from "../entities/PickingSlipDate";
import { PickingSlipItem } from "../entities/PickingSlipItem";
import { PickingSlipResponse } from "../types/PickingSlipType";
import InvalidPageException from "../exceptions/InvalidPageException";
import InvalidLimitException from "../exceptions/InvalidPageException";
import InvalidPickingSlipStatus from "../exceptions/InvalidPickingSlipStatus";

class PickingSlipService {

    private pickingSlipRepository;

    constructor() {
        this.pickingSlipRepository = AppDataSource.getRepository(PickingSlip);
    }

    /**
     * Retrieves an array of PickingSlipResponse objects which represent the picking slips. Each object contains the order_id, picking_slip_id, picking_slip_status and has_pre_order_item.
     *
     * @param status - The status of the picking slip. The value can be "printed", "not printed", "held" or an empty string.
     * @param page - The page number of the result set.
     * @param limit - The number of records to return per page.
     * @returns An array of PickingSlipResponse objects.
     */
    async getPickingSlips(pickingSlipStatus: "printed" | "not_printed" | "held" | "", page: number, limit: number): Promise<PickingSlipResponse[]> {

        if (page < 0)
            throw new InvalidPageException("Page must be greater than 0")

        if (limit < 0)
            throw new InvalidLimitException("Limit must be greater than 0");

        if (!["", "printed", "not_printed", "held"].includes(pickingSlipStatus))
            throw new InvalidPickingSlipStatus("The provided picking status is invalid. Please use one of the following: 'printed', 'not_printed', 'held', or an empty value.");

        const query = this.pickingSlipRepository
            .createQueryBuilder("ps")
            .innerJoin(PickingSlipDate, "psd", "ps.id = psd.id")
            .innerJoin((query) => {
                return query.select(["items.`picking_slip_id`", "SUM(items.is_pre_order) AS count_of_pre_orders"])
                    .from(PickingSlipItem, 'items').groupBy("items.picking_slip_id")
            },
                "items",
                "items.picking_slip_id = ps.id")
            .select([
                "ps.order_id as order_id",
                "ps.id as picking_slip_id",
                `(CASE 
                        WHEN (psd.printed_at IS NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL) THEN "not printed"
                        WHEN (psd.printed_at IS NOT NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL) THEN "printed"
                        WHEN (psd.held_at IS NOT NULL) THEN "held"
                        ELSE ""
                    END) as picking_slip_status`,

                "items.count_of_pre_orders > 0 AS 'has_pre_order_item'"

            ]);

        // status filter
        if (pickingSlipStatus === 'printed')
            query.where("psd.printed_at IS NOT NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL")
        else if (pickingSlipStatus === 'not_printed')
            query.where("psd.printed_at IS NULL AND psd.inspected_at IS NULL AND psd.shipped_at IS NULL AND psd.held_at IS NULL")
        else if (pickingSlipStatus === 'held')
            query.where("psd.held_at IS NOT NULL")

        query.orderBy("ps.created_at", "DESC");

        // pagination
        query.offset(page * limit)
        query.limit(limit);

        return await query.getRawMany()

    }

}


export default PickingSlipService;