
//Actua como controlador y rutas

import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userServices";
import upload from "@middlewares/multer";
import { Router } from "express";
import { IResponse, IUserRepository, IUserService, User } from "types/UserTypes";
import {  UserController} from "@controllers/UserController";
const router = Router()
const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)
const userController = new UserController(userService)
export default ()=>{
    router.post("/users/save",upload.single("image"), async (req,res)=>{  
        
        
        await userController.create(req,res)
    })
    router.post("/users/login",async(req,res)=>{
        console.log(req.body);
        
        await userController.login(req,res)
    })
    router.get("/",async(req,res)=>{
        res.send({
            message:"Welcome to users"
        })
    })
    return router
}