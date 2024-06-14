import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { FeedbackService } from './feedback.service';
import { Public, Roles } from "../../constants/decorator";
import { HttpMessage, HttpStatus, Role } from "../../global/globalEnum";
import { ResponseData } from "../../global/globalClass";
import { Feedback } from "../../models/feedback.model";
import { FeedbackDTO } from "../../dto/feedback.dto";
import { ResponseType } from "../../global/globalType";
import { ApiTags } from "@nestjs/swagger";
 
@ApiTags('FeedbackApi')
@Controller('feedback')
export class FeedbackController{
    constructor(private feedbackService: FeedbackService){
    }

    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<Feedback[]>> {
        try{
            const feedback = await this.feedbackService.findAll();
            return new ResponseData<Feedback[]>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Feedback[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Admin)
    async create(@Body() feedbackDto: FeedbackDTO): Promise<ResponseData<Feedback>> {
        try {
            const feedback = await this.feedbackService.create(feedbackDto);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number, @Body()  feedbackDto: FeedbackDTO): Promise<ResponseType<Feedback>> {
        try {
            const feedback = await this.feedbackService.update(id, feedbackDto);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number): Promise<ResponseType<Feedback>> {
        try {
            const feedback = await this.feedbackService.delete(id);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}