import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { NotificationService } from './notification.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ResponseData } from "src/global/globalClass";
import { Notification } from "src/models/notification.model";
import { NotificationDTO } from "src/dto/notification.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('NotificationApi')
@Controller('notification')
export class NotificationController{
    constructor(private notificationService: NotificationService){
    }

    @Public()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all Notification', 
        description: 'Retrieve all Notification from the database.' 
    })
    // @Roles(Role.Customer, Role.Manager, Role.Admin)
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

    @ApiQuery({ 
        name: 'UnRead', 
        required: false, 
        type: String, 
        description: 'Filter Un Read' 
    })

    @Public()
    async showNotificate(@Query() query: any) {
        const page: number = parseInt(query.page as any) || 1;
        const filters = {
            IsRead: query.IsRead,
            UnRead: query.UnRead
        };
        const sort = {
            field: query.sortField || 'Date',
            notificate : query.sortNotificate || 'ASC'
        };

        return this.notificationService.getNotificate(page, filters, sort);
    }


     

    
    @ApiBearerAuth()
    @ApiBody({ type: NotificationDTO, description: 'The data to create Notification'})
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
    @ApiParam({ name: 'id', description: 'ID of the notificate to update', type: Number })
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
    @ApiParam({ name: 'id', description: 'ID of the notificate to delete', type: Number })
    @Delete('/delete')
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