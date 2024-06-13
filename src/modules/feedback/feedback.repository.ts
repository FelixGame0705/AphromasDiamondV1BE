import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackEntity } from "src/entities/feedback.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { Feedback } from "src/models/feedback.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class FeedbackRepository extends BaseRepository<FeedbackEntity, Repository<FeedbackEntity>> implements FeedbackRepository{
    constructor(
        @InjectRepository(FeedbackEntity)
        protected readonly repository: Repository<FeedbackEntity>
    ){
        super(repository);
    }
    findRelationById(id: number): Promise<Feedback> {
        return null;
    }

    protected getIdField(): keyof Feedback {
        return 'FeedbackID';
    }

    async findAll(): Promise<FeedbackEntity[]> {
        return await this.repository.find({where: { IsRead: true } as FindOptionsWhere<FeedbackEntity>});
    }

}