import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { FeedbackService } from './feedback.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { Feedback } from "src/models/feedback.model";
import { FeedbackDTO } from "src/dto/feedback.dto";
import { ResponseType } from "src/global/globalType";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('FeedbackApi')
@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {
    }
    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({
        summary: 'Get all feedbacks',
        description: 'Retrieve all feedbacks from the database.'
    })
    @Public()
    async findAll(): Promise<ResponseData<Feedback[]>> {
        try {
            const feedback = await this.feedbackService.findAll();
            return new ResponseData<Feedback[]>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
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
        name: 'FeedbackID',
        required: false,
        type: Number,
        description: 'ID of Feedback'
    })
    @ApiQuery({
        name: 'DiamondID',
        required: false,
        type: Number,
        description: 'ID of Diamond'
    })
    @ApiQuery({
        name: 'JewwelrySettingID',
        required: false,
        type: Number,
        description: 'ID of JewwelrySetting'
    })
    @ApiQuery({
        name: 'OrderID',
        required: false,
        type: Number,
        description: 'ID of Order'
    })
    @ApiQuery({
        name: 'AccountID',
        required: false,
        type: Number, 
        description: 'Account ID' 
    })
    @ApiQuery({
        name: 'ProductID',
        required: false,
        type: Number,
        description: ' ID of Product'
    })


    @Public()
    async showFeedback(@Query() query: any) {
        try {
            const page: number = parseInt(query.page as any) || 1;
            const filters = {
                FeedbackID: query.FeedbackID,
                DiamondID: query.DiamondID,
                JewwelrySettingID: query.JewwelrySettingID,
                OrderID: query.OrderID,
                AccountID: query.AccountID,
                ProductID: query.ProductID,
             
            };
            const sort = {
                field: query.sortField || 'FeedbackID',
                feedback: query.sortFeedback || 'ASC'
            };

            return this.feedbackService.getFeedback(page, filters, sort);
        }
        catch (error) {
            console.log(error)
        }

    }



    @ApiBearerAuth()
    @ApiBody({ type: FeedbackDTO, description: 'The data to create feedback' })

    @Post('/create')
    @Roles(Role.Manager, Role.Admin, Role.Customer)
    async create(@Body() feedbackDto: FeedbackDTO): Promise<ResponseData<Feedback>> {
        try {
            const feedback = await this.feedbackService.create(feedbackDto);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the feedback to update', type: Number })
    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number, @Body() feedbackDto: FeedbackDTO): Promise<ResponseType<Feedback>> {
        try {
            const feedback = await this.feedbackService.update(id, feedbackDto);
            return new ResponseData<Feedback>(feedback, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Feedback>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the feedback to delete', type: Number })
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