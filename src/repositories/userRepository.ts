import { AppDataSource } from "@config/ormconfig";
import { User } from "@models/User";
import { Repository } from "typeorm";
import { IUserRepository} from "types/UserTypes";

export class UserRepository implements IUserRepository{
    private repo: Repository<User>
    constructor(){
        this.repo = AppDataSource.getRepository(User)
    }
    async create(data: User): Promise<User> {
        const newUser = this.repo.create(data)
        return await this.repo.save(newUser)
    }

    async find(): Promise<User[]> {
        return await this.repo.find()
    }
}