
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { PickingSlipItem } from "./PickingSlipItem";

@Entity({ name: "picking_slips" })
export class PickingSlip {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "bigint", width: 20 })
    order_id: number;

    @Column({ type: "bigint", width: 20 })
    order_fullfillment_order_id: number;

    @Column({ type: "tinyint", width: 1 })
    is_contained_single_product: boolean;

    @Column({ type: "timestamp" })
    created_at: Date;

    //NOTE : pickingSlip is a propery of PickingSlipItem Class
    @OneToMany(() => PickingSlipItem, (item) => item.pickingSlip)
    pickingSlipItems: PickingSlipItem[]
}   