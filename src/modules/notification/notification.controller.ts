import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { NotificationService } from './notification.service';
import { Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ResponseData } from "src/global/globalClass";
import { Notification } from "src/models/notification.model";
import { NotificationDTO } from "src/dto/notification.dto";

 
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
    @Roles(Role.Manager, 
        Role.Customer
    )
    async create(@Body() notificationDto: NotificationDTO): Promise<ResponseData<Notification>> {
    try {
        const notification = await this.notificationService.create(notificationDto);
        return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
        return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
}
}

    
}