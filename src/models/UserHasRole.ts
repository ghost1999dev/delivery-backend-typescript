import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity("user_has_roles")
export class UserHasRole {
    @PrimaryColumn()
    id_user: number;

    @PrimaryColumn()
    id_rol: number;

    @ManyToOne(() => User, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "id_user" })
    user: User;

    @ManyToOne(() => Role, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: "id_rol" })
    role: Role;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}