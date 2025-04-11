//Modelos de Typeorm

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Role } from './Role';

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
    password:string;
    @ManyToMany(()=> Role)
    @JoinTable({
        name: "user_has_roles",
        joinColumn:{
            name: "id_user",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name: "id_rol",
            referencedColumnName:"id"
        }
    })
    roles:Role[];
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
}