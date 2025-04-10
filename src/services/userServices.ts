
//Se comunica con el repositorio para utilizar los servicios
import { IResponse, IUserRepository,IUserService, User, UserLogin } from "types/UserTypes";
export class UserService implements IUserService {
    private userRepository: IUserRepository
    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository
    }

    async createUser(user: User,file?:Express.Multer.File): Promise<IResponse<User>> {

        return this.userRepository.create(user,file) 
    }

    async findUsers(): Promise<User[]> {
        return this.userRepository.find()
    }
    async loginUsers(email: string, password: string): Promise<IResponse<UserLogin>> {
        return this.userRepository.login(email,password)
    }
}


