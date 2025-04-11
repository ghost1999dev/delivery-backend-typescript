
//Habla con la base de datos

import { AppDataSource } from "@config/ormconfig";
import { User } from "@models/User";
import { Repository } from "typeorm";
import { IResponse, IUserRepository, UserLogin} from "types/UserTypes";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { uploadImageToFirebase } from "../utils/cloud_storage";
import { UserHasRole } from "@models/UserHasRole";
const SECRET_KEY = process.env.JWT_SECRET || "my_secret_key"

export class UserRepository implements IUserRepository{
    private repo: Repository<User>
    constructor(){
        this.repo = AppDataSource.getRepository(User)
    }
    async create(data: User,file?:Express.Multer.File,deletePathImage?:string): Promise<IResponse<User>> {
        try {
            if (file) {
                const pathImage = `${Date.now()}_${file.originalname}`;
                const imageUrl= await uploadImageToFirebase(file,pathImage,deletePathImage)
                data.image = imageUrl as string
            }    
            const saltRound = 10
            data.password = await bcrypt.hash(data.password, saltRound)
            const newUser = this.repo.create(data)
            const savedUser = await this.repo.save(newUser)
            this.registerRole(savedUser.id.toString(),"3")
            return {
                success:true,
                message: "Usuario creado exitosamente",
                data: savedUser
            }
        } catch (error:any) {
            return {
                success: false,
                message: "Error al crear el usuario",
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
            const users = await this.findUserWithRolesByEmail(email)
            const user = users[0]
            if(!user){
                return {
                    success: false,
                    message: "Usuario no encontrado"
                }
            }
          
            
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if(!isPasswordValid){
                return{
                    success: false,
                    message: "Contraseña incorrecta"
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
                phone:user.phone,
                token: token,
                roles: user.roles
            }
            return {
                success:true,
                message: "Login exitoso",
                data: userLoginResponse,
               
            }
        } catch (error) {
            return {
                success: false,
                message: "No se ha podido loguear",
                data: undefined,
                error
            }
            
        }
    }
    async registerRole(userId: string, roleId: string): Promise<IResponse<string>> {
        try {
            const userRoleRepo = AppDataSource.getRepository(UserHasRole)
            const newUserRole = userRoleRepo.create({
                id_user:Number(userId),
                id_rol:Number(roleId)
            })
            await userRoleRepo.save(newUserRole)
            return {
                success:true,
                message:"Rol asigned succesfully",
                data: ""
            }
        } catch (error:any) {
            return {
                success:false,
                message:"Erro to save the rol",
                error: error.message
            }
        }
    }
    async findUserWithRolesByEmail(email:string){
       
        
        const result = await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoin("user.roles","role")
        .select([
            "user.id",
            "user.email",
            "user.name",
            "user.lastname",
            "user.image",
            "user.password",
            "role.id",
            "role.name",
            "role.image",
            "role.route"
        ])
        .where("user.email = :email",{ email })
        .getMany() 
    return result
    }
}