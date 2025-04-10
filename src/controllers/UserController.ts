
import { Request, Response } from "express";
import { UserService } from "@services/userServices";
import { IResponse, IUserService,User } from "types/UserTypes";

export class UserController {
    private userService: IUserService
    constructor(userService:IUserService) {
        this.userService = userService
    }

    
    async create(req:Request,res:Response){
        try {
            const file = req.file
            const userString = req.body.user
            const user = JSON.parse(userString)
            const newUser = await this.userService.createUser(user,file)
            return res.status(200).json(newUser)
        } catch (error) {
            return res.status(500).json({success:false,message:"Error en el servidor", error})
        }
    }

    async login(req:Request,res:Response) {
        try {
          const {email,password}=req.body
          const response = await this.userService.loginUsers(email,password)
          if(!response.success){
            return res.status(401).json(response)
          }
          return res.status(200).json(response)
            
        } catch (error) {
            return res.status(500).json({success:false,message:"Error en el servidor", error})
        }
    }
}