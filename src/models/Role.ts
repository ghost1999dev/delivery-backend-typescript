import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 90, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    image: string;

    @Column({ type: "varchar", length: 180 })
    route: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}