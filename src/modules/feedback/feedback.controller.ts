import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { FeedbackService } from './feedback.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { Feedback } from "src/models/feedback.model";
import { FeedbackDTO } from "src/dto/feedback.dto";
import { ResponseType } from "src/global/globalType";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
 
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


    @Get('/showFeedback')
    @ApiQuery({ 
        name: 'page', 
        required: false, 
        type: Number, 
        description: 'Page number', 
        example: 1 
    })
    
    @ApiQuery({ 
        name: 'Product Name', 
        required: false, 
        type: String, 
        description: 'Name of Product' 
    })

    @ApiQuery({ 
        name: 'Customer Name', 
        required: false, 
        type: String, 
        description: 'Customer Name' 
    })

    @Public()
    async showFeedback(@Query() query: any) {
        const page: number = parseInt(query.page as any) || 1;
        const filters = {
            ProductName: query.ProductName,
            CustomerName: query.CustomerName
        };
        const sort = {
            field: query.sortField || 'Name',
            feedback: query.sortFeedback || 'ASC'
        };

        return this.feedbackService.getFeedback(page, filters, sort);
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


    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param() id: number): Promise<ResponseType<Feedback>> {
        try {
            const feedback = await this.feedbackService.delete(id);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}