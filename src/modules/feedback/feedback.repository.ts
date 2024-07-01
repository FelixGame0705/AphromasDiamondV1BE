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

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, feedback: 'ASC' | 'DESC' }
    ): Promise<{ data: FeedbackEntity[], total: number, page: number, last_page: number }> {
        const builder = this.repository.createQueryBuilder('feedback');

        // Apply filters
        // if (filters.isRead) {
        //     builder.andWhere("notification.isRead LIKE = :IsRead", { isRead: `${filters.isRead}` });
        // }

        // Apply sorting
        if (sort && sort.field && sort.feedback) {
            builder.orderBy(`feedback.${sort.field}`, sort.feedback);
        }

        // Get total count
        const total = await builder.getCount();

        // Apply pagination
        builder.offset((page - 1) * perPage).limit(perPage);

        // Get data
        const data = await builder.getMany();

        return {
            data,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        };
    }

}