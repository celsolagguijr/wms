
import { PrimaryGeneratedColumn, Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { PickingSlip } from "./PickingSlip";


@Entity({ name: "picking_slip_dates" })
export class PickingSlipDate {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column("varchar", { length: 20 })
    printed_username: string;

    @Column("varchar", { length: 20 })
    inspected_username: string;

    @Column("varchar", { length: 20 })
    packed_username: string;

    @Column("varchar", { length: 20 })
    shipped_username: string;

    @Column("varchar", { length: 20 })
    held_username: string;

    @Column("varchar", { length: 20 })
    cancelled_username: string;

    @Column("varchar", { length: 20 })
    refunded_username: string;

    @Column("varchar", { length: 20 })
    confirmed_username: string;

    @Column({ type: "timestamp", nullable: true })
    printed_at: Date;

    @Column({ type: "timestamp", nullable: true })
    inspected_at: Date;

    @Column({ type: "timestamp", nullable: true })
    packed_at: Date;

    @Column({ type: "timestamp", nullable: true })
    shipped_at: Date;

    @Column({ type: "timestamp", nullable: true })
    delivered_at: Date;

    @Column({ type: "timestamp", nullable: true })
    returned_at: Date;

    @Column({ type: "timestamp", nullable: true })
    cancelled_at: Date;

    @Column({ type: "timestamp", nullable: true })
    refunded_at: Date;

    @Column({ type: "timestamp", nullable: true })
    held_at: Date;

    @Column({ type: "timestamp", nullable: true })
    confirmed_at: Date;

    @Column("varchar", { length: 20 })
    held_reason: string;

    @OneToOne(() => PickingSlip)
    @JoinColumn({ name: "picking_slip_id" })
    pickingSlip: PickingSlip



}   