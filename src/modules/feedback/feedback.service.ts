import { Inject, Injectable } from "@nestjs/common";
import { Feedback } from "src/models/feedback.model";
import { FeedbackRepository } from "./feedback.repository";
import { IFeedbackRepository } from "src/interfaces/IFeedbackRepository";
import { FeedbackDTO } from "src/dto/feedback.dto";
import { PRODUCT_PER_PAGE } from "src/constants/constant";

@Injectable()
export class  FeedbackService {

  constructor(
    @Inject('IFeedbackRepository')  
    private readonly feedbackRepository: IFeedbackRepository
  ) {}

  async findAll(): Promise<Feedback[]> {
    return (await this.feedbackRepository.findAll());
  }

  async findById(id: number): Promise<Feedback> {
    return await this.feedbackRepository.findById(id);
  }

  async create(feedback: FeedbackDTO): Promise<Feedback> {
    return await this.feedbackRepository.create(feedback);
  }

  async update(id: number, feedback: FeedbackDTO): Promise<Feedback> {
    await this.feedbackRepository.update(id, feedback);
    return this.findById(id);
  }

  async delete(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findById(id);
    if (!feedback) {
        throw new Error('id not found');
    }
        await this.feedbackRepository.delete(id);
        return feedback;
  }

  async findRelationById(id: number): Promise<Feedback> {
    return await this.feedbackRepository.findRelationFeedbackById(id);
  }

 

  async getFeedback(page: number, filters: any, sort: { field: string, feedback: 'ASC' | 'DESC' }) {
    const perPage = PRODUCT_PER_PAGE;
    return this.feedbackRepository.paginateAndFilter(page, perPage, filters, sort);
  }
  

}

 