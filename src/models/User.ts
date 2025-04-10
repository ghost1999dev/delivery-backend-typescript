//Modelos de Typeorm

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column({type:"varchar",length:180,unique:true})
    email: string
    @Column({type:"varchar", length:90})
    name: string
    @Column({type:"varchar",length:255})
    lastname:string
    @Column({type:"varchar",length:255,unique:true})
    phone:string
    @Column({type:"varchar",length:255, default:'default.image'})
    image:string
    @Column({type:"varchar",length:90})
    password:string
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}