import { UserRepository } from "@repositories/userRepository";
import { UserService } from "@services/userServices";
import { Router } from "express";
import { IUserRepository, IUserService } from "types/UserTypes";
const router = Router()

const userRepository: IUserRepository = new UserRepository()
const userService: IUserService = new UserService(userRepository)
export default ()=>{
    router.post("/users/save", async (req,res)=>{
       const newUser = await userService.createUser(req.body)
       res.json(newUser)
    })
    return router
}