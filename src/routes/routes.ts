
//Actua como controlador y rutas

import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userServices";
import { Router } from "express";
import { IUserRepository, IUserService } from "types/UserTypes";
const router = Router()

const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)
export default ()=>{
    
    router.post("/users/save", async (req,res)=>{
        console.log(req.body);
       const newUser = await userService.createUser(req.body)
       res.json(newUser)
    })

    router.post("/users/login", async (req,res)=>{
        const{email,password}= req.body
        const response = await userService.loginUsers(email,password)
        if (!response.success) {
            res.status(401).json(response)clea
        }
        res.json(response)

    })
    return router
}