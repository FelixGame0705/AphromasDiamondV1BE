import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackEntity } from "src/entities/feedback.entity";
import { BaseRepository } from "src/interfaces/BaseRepository";
import { IFeedbackRepository } from "src/interfaces/IFeedbackRepository";
import { Feedback } from "src/models/feedback.model";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class FeedbackRepository extends BaseRepository<FeedbackEntity, Repository<FeedbackEntity>> implements IFeedbackRepository{
    constructor(
        @InjectRepository(FeedbackEntity)
        protected readonly repository: Repository<FeedbackEntity>
    ){
        super(repository);
    }
    findRelationFeedbackById(id: number): Promise<Feedback> {
        return null;
    }

    protected getIdField(): keyof Feedback {
        return 'FeedbackID';
    }

    async findAll(): Promise<FeedbackEntity[]> {
        return await this.repository.find({where: { IsActive: true }, relations:['account']});
    }

    async paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, feedback: 'ASC' | 'DESC' }
    ): Promise<{ data: FeedbackEntity[], total: number, page: number, last_page: number }> {
        const query = this.repository.createQueryBuilder('feedback')
        .select('feedback')

       // Apply filters
        if (filters.FeedbackID) {
            query.andWhere("feedback.FeedbackID = :FeedbackID", { FeedbackID: filters.FeedbackID });
        }
        if (filters.DiamondID) {
            query.andWhere("feedback.DiamondID = :DiamondID", { DiamondID: filters.DiamondID });
        }
        if (filters.JewelrySettingID) {
            query.andWhere("feedback.JewelrySettingID = :JewelrySettingID", { JewelrySettingID: filters.JewelrySettingID });
        }
        if (filters.OrderID) {
            query.andWhere("feedback.OrderID = :OrderID", { OrderID: filters.OrderID });
        }
        if (filters.AccountID) {
            query.andWhere("feedback.AccountID = :AccountID", { AccountID: filters.AccountID });
        }
        if (filters.ProductID) {
            query.andWhere("feedback.ProductID = :ProductID", { ProductID: filters.ProductID });
        }
        const total = await query.getCount();
        // Apply sorting
        if (sort && sort.field && sort.feedback) {
            query.orderBy(`feedback.${sort.field}`, sort.feedback);
        }
        const feedbackIDs = await query.getRawMany().then(results => results.map(result => result.feedback_FeedbackID));
        if (feedbackIDs.length === 0) { 
            return {
                data: [],
                total,
                page,
                last_page: Math.ceil(total / perPage)
            };
        }
        // Get total count
        // const total = await query.getCount();

        // Apply pagination
        query.offset((page - 1) * perPage).limit(perPage);

        const builder = this.repository.createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.account', 'account')
            .select([
                'feedback',
                'account.AccountID',
                'account.Name',
                'account.PhoneNumber',
                'account.Email'
            ])
            .whereInIds(feedbackIDs);
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