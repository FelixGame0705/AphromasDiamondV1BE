import { InjectRepository } from "@nestjs/typeorm";
import { BaseEntity, Repository, DeleteResult, FindOptionsWhere, DeepPartial, ObjectLiteral} from "typeorm";

export abstract class BaseRepository<
T extends BaseEntity, 
R extends Repository<T>
> {
    constructor(
        @InjectRepository(Repository<T>) 
        protected readonly repository: R,
    ){

    }
    protected abstract getIdField(): keyof T;
    async findAll():Promise<T[]>{
        return await this.repository.find();
    }
    async findById(id: number): Promise<T>{
        const idField = this.getIdField();
        return await this.repository.findOne( {where: {[idField]:id} as FindOptionsWhere<BaseEntity>});
    }
    async create(data:T): Promise<T>{
        try{
        return await this.repository.save(data);
        }catch(error){
            console.log(error);
        }
    }
    async update(id: number, data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : null): Promise<T>{
        try{
            console.log("Data",data);
        await this.repository.update(id, data);
        return this.findById(id);
        }catch(error){
            console.log("Error",error);
        }
    }
    async delete(id: number): Promise<boolean>{
        const isFlag: DeleteResult = await this.repository.delete(id);
        return isFlag.affected === 1;
    }
}