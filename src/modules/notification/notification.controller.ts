import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { NotificationService } from './notification.service';
import { Roles } from "../../constants/decorator";
import { HttpMessage, HttpStatus, Role } from "../../global/globalEnum";
import { ResponseType } from "../../global/globalType";
import { ResponseData } from "../../global/globalClass";
import { Notification } from "../../models/notification.model";
import { NotificationDTO } from "../../dto/notification.dto";
import { ApiTags } from "@nestjs/swagger";

 @ApiTags('NotificationApi')
@Controller('notification')
export class NotificationController{
    constructor(private notificationService: NotificationService){
    }

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

    
    @Post('/create')
    @Roles(Role.Manager,Role.Customer)
    async create(@Body() notificationDto: NotificationDTO): Promise<ResponseData<Notification>> {
        try {
            const notification = await this.notificationService.create(notificationDto);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() notificationDto: NotificationDTO): Promise<ResponseType<Notification>> {
        try {
            const notification = await this.notificationService.update(id, notificationDto);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number ): Promise<ResponseType<Notification>> {
        try {
            const notification = await this.notificationService.delete(id);
            return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}