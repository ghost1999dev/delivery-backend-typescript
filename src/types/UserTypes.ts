
export interface User {
    id?: number
    email:string
    name:string
    lastname:string
    phone:string
    image:string
    password:string
}

export interface UserLogin {
    id: number;
    email: string;
    image: string;
    lastname: string;
    name: string;
    phone: string;
    token: string;
    roles: {
      id: number;
      name: string;
      image: string;
      route: string;
    }[];
  }
/**
 * Estructura de la respuesta estandar de la API
 * @template T Tipo de datos que se devolveran en la respuesta
 */
export interface IResponse<T>{
    success: boolean
    message: string
    data?: T
    error?:any
    
}

export interface IUserRepository{
   create(data: User,file?:Express.Multer.File):Promise<IResponse<User>>
   find(): Promise<User[]> 
   findByEmail(email:string):Promise<User | null>
   login(email:string, password:string):Promise<IResponse<UserLogin>>
   registerRole(userId:string,roleId:string):Promise<IResponse<string>>,
}
export interface IUserService {
    createUser(user: User,file?:Express.Multer.File): Promise<IResponse<User>>
    findUsers(): Promise<User[]>
    loginUsers(email:string, password:string):Promise<IResponse<UserLogin>>
}

