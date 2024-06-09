// import { Controller, Get } from '@nestjs/common';
// import { ShellService } from './shell.servie';
// import { Roles } from 'src/constants/decorator';
// import { Role } from 'src/global/globalEnum';
// import { ResponseData } from 'src/global/globalClass';

// @Controller('shell')
// export class ShellController{
//     constructor(private shellService: ShellService){       
//     }


//     @Get('/showAll')
//     @Roles(Role.Customer, Role.Manager, Role.Admin)
//     async findAll(): Promise<ResponseData<Notification[]>> {
//         try{
//             const notification = await this. shellServiceService.findAll();
//             return new ResponseData<Notification[]>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
//         }catch(error){
//             return new ResponseData<Notification[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
//         }
//     }

    
//     @Post('/create')
//     @Roles(Role.Manager, 
//         Role.Customer
//     )
//     async create(@Body() notificationDto: NotificationDTO): Promise<ResponseData<Notification>> {
//     try {
//         const notification = await this.notificationService.create(notificationDto);
//         return new ResponseData<Notification>(notification, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
//     } catch (error) {
//         return new ResponseData<Notification>(null, HttpStatus.ERROR, HttpMessage.ERROR);
// }
// }
// }