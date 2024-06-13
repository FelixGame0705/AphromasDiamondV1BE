import { AbstractPromise } from "./AbstractRepository";
import { Feedback } from "src/models/feedback.model";
 export interface IFeedbackRepository extends AbstractPromise<Feedback>{
    findRelationFeedbackById(id: number): Promise<Feedback>;
    paginateAndFilter(
        page: number,
        perPage: number,
        filters: any,
        sort: { field: string, feedback: 'ASC' | 'DESC' }
    ): Promise<{ data: Feedback[], total: number, page: number, last_page: number }>;
}