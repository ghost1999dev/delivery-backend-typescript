
//Habla con la base de datos

import { AppDataSource } from "@config/ormconfig";
import { User } from "@models/User";
import { Repository } from "typeorm";
import { IResponse, IUserRepository, UserLogin} from "types/UserTypes";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key"

export class UserRepository implements IUserRepository{
    private repo: Repository<User>
    constructor(){
        this.repo = AppDataSource.getRepository(User)
    }
    async create(data: User): Promise<IResponse<User>> {
        try {
            const saltRound = 10
            data.password = await bcrypt.hash(data.password, saltRound)
            const newUser = this.repo.create(data)
            const savedUser = await this.repo.save(newUser)
            return {
                success:true,
                message: "User registerd succesfully",
                data: savedUser
            }
        } catch (error:any) {
            return {
                success: false,
                message: "Error to create a user",
                error: error.message
            }
        }
        
    }
    async find(): Promise<User[]> {
        return await this.repo.find()
    }
    async findByEmail(email: string): Promise<User | null> {
        return await this.repo.findOne({where: {email}})
    }

    async login(email: string, password: string): Promise<IResponse<UserLogin>> {
        try {
            const user = await this.findByEmail(email)
            if(!user){
                return {
                    success: false,
                    message: "User not found"
                }
            }
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if(!isPasswordValid){
                return{
                    success: false,
                    message: "The password is not correct"
                }
            } 
            const token = jwt.sign({id: user.id,email:user.email},SECRET_KEY,{
                expiresIn:"1h"
            })
            const userLoginResponse: UserLogin={
                id:user.id,
                email:user.email,
                name:user.name,
                image:user.image,
                lastname:user.lastname,
                phone:user.phone
            }
            return {
                success:true,
                message: "Login success",
                data: userLoginResponse,
                token: token
            }
        } catch (error) {
            return {
                success: false,
                message: "Could not log in",
                data: undefined,
                token: undefined
            }
            
        }
    }
}