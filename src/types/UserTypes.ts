
export interface User {
    id?: number
    email:string
    name:string
    lastname:string
    phone:string
    image:string
    password:string
}

export interface IUserRepository{
   create(data: User):Promise<User>
   find(): Promise<User[]> 
}
export interface IUserService {
    createUser(user: User): Promise<User>
    findUsers(): Promise<User[]>
}