import { Module } from "@nestjs/common";
import { FeedbackController } from "./feedback.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedbackEntity } from "src/entities/feedback.entity";
import { FeedbackService } from "./feedback.service";
import { FeedbackRepository } from "./feedback.repository";

@Module({
    
    imports: [TypeOrmModule.forFeature([FeedbackEntity])],
    controllers: [FeedbackController],
    providers: [FeedbackService, {
        useClass:  FeedbackRepository,
        provide: 'IFeedbackRepository'
    }]
})
export class FeedbackModule{}