import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { NotificationService } from './notification.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ResponseData } from "src/global/globalClass";
import { Notification } from "src/models/notification.model";
import { NotificationDTO } from "src/dto/notification.dto";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('NotificationApi')
@Controller('notification')
export class NotificationController{
    constructor(private notificationService: NotificationService){
    }

    @Public()
    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<Notification[]>> {
        try{
            const notification = await this.notificationService.findAll();
            return new ResponseData<Notification[]>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Notification[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    @Get('/showNotificate')
    @ApiQuery({ 
        name: 'page', 
        required: false, 
        type: Number, 
        description: 'Page number', 
        example: 1 
    })
    
    @ApiQuery({ 
        name: 'IsRead', 
        required: false, 
        type: String, 
        description: 'Filter Is Read' 
    })
    @Public()
    async showNotificate(@Query() query: any) {
        const page: number = parseInt(query.page as any) || 1;
        const filters = {
            IsRead: query.IsRead
        };
        const sort = {
            field: query.sortField || 'Date',
            order: query.sortOrder || 'ASC'
        };

        return this.notificationService.getNoti(page, filters, sort);
    }


     

    
    @ApiBearerAuth()
    @Post('/create')
    @Roles(Role.Admin, Role.Manager)
    async create(@Body() notificationDto: NotificationDTO): Promise<ResponseData<Notification>> {
        try {
            const notification = await this.notificationService.create(notificationDto);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Put('/update/:id')
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() notificationDto: NotificationDTO): Promise<ResponseType<Notification>> {
        try {
            const notification = await this.notificationService.update(id, notificationDto);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Post('/delete')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number ): Promise<ResponseType<Notification>> {
        try {
            const notification = await this.notificationService.delete(id);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}