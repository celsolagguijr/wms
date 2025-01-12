
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { PickingSlip } from "./PickingSlip";

@Entity({ name: "picking_slip_items" })
export class PickingSlipItem {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bigint", width: 20 })
    item_id: number;

    @Column({ type: "bigint", width: 20 })
    stock_id: number;

    @Column({ type: "bigint", width: 20 })
    order_fulfillment_product_id: number;

    @Column({ type: "int", width: 11 })
    quantity: number;

    @Column({ type: "int", width: 11 })
    refunded_quantity: number;

    @Column({ type: "bigint", width: 20 })
    location_id: number;

    @Column("varchar", { length: 30 })
    location_code: number;

    @Column({ type: "tinyint", width: 1 })
    is_pre_order: boolean;

    @Column({ type: "tinyint", width: 1 })
    is_sales_only: boolean;

    @Column({ type: "timestamp", nullable: true })
    pre_order_shipping_at: Date;

    @Column({ type: "timestamp", nullable: true })
    pre_order_deadline_at: Date;

    @Column({ type: "timestamp", nullable: true })
    created_at: Date;

    @Column({ type: "timestamp", nullable: true })
    updated_at: Date;

    //NOTE : `pickingSlip` is a propery of `PickingSlip` Class
    @ManyToOne(() => PickingSlip, (ps) => ps.pickingSlipItems)
    @JoinColumn({ name: "picking_slip_id" })
    pickingSlip: PickingSlip

    @Column({ type: "bigint", width: 20 })
    picking_slip_id: number;


}   