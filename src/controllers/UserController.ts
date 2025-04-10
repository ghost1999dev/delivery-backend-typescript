import { User } from "@models/User";
import { Request, Response } from "express";
import { UserService } from "@services/userServices";
import { IResponse, IUserService } from "types/UserTypes";

export class UserController {
    private userService: IUserService
    constructor(userService:IUserService) {
        this.userService = userService
    }
    async create(req:Request,res:Response){
        try {
            const newUser = await this.userService.createUser(req.body)
            return res.status(200).json(newUser)
        } catch (error) {
            return res.status(500).json({success:false,message:"Server error", error})
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
            return res.status(500).json({success:false,message:"Server error", error})
        }
    }
}