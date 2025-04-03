
export interface User {
    id?: number
    email:string
    name:string
    lastname:string
    phone:string
    image:string
    password:string
}

export interface IResponse<T>{
    success: boolean
    message: string
    data?: T
    error?:any
    token?:string
}

export interface IUserRepository{
   create(data: User):Promise<IResponse<User>>
   find(): Promise<User[]> 
   findByEmail(email:string):Promise<User | null>
   login(email:string, password:string):Promise<IResponse<string>>
}
export interface IUserService {
    createUser(user: User): Promise<IResponse<User>>
    findUsers(): Promise<User[]>
    loginUsers(email:string, password:string):Promise<IResponse<string>>
}

