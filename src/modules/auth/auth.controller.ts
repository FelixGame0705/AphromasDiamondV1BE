import { Body, Controller, Res,Post, UsePipes, ValidationPipe, Param } from "@nestjs/common";
import { Response } from "express";
import { AuthPayloadCustomerDTO, AuthPayloadDTO, AuthPermission, AuthResponseDTO } from "../../dto/auth.dto";
import { ResponseData } from "../../global/globalClass";
import { HttpMessage, HttpStatus, Role } from "../../global/globalEnum";
import { ResponseType } from "../../global/globalType"
import { AuthService } from "./auth.service";
import { Public, Roles } from "../../constants/decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController{
    constructor(protected readonly authService: AuthService){

    }
    @Public()
    @Post('/signin')
    async signIn(
        @Body() auth: AuthPayloadDTO, 
        @Res() res: Response
    ): Promise<ResponseType<AuthPermission | boolean>>{
        try{
            const isAuth = await this.authService.signIn(auth);
            if(!isAuth){
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Public()
    @Post('/signup')
    @UsePipes(new ValidationPipe({transform:true}))
    async signUp(
        @Body() auth: AuthPayloadDTO, 
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>>{
        try{
            const isAuth = await this.authService.signUp(auth);
            if(!isAuth){
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Public()
    @Post('/signupCustomer')
    async signUpCustomer(
        @Body() auth: AuthPayloadCustomerDTO, 
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>>{
        try{
            const isAuth = await this.authService.signUpCustomer(auth);
            if(!isAuth){
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Roles(Role.Admin, Role.DeliveryStaff, Role.Manager, Role.SaleStaff)
    @Public()
    @Post('/update/:Username')
    async updateAccount(
        @Param('Username') username: string,
        @Body() auth: AuthPayloadDTO, 
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>>{
        try{
            const haveUsername = await this.authService.findByUsername(username)
            console.log("AccountID ", haveUsername.AccountID);
            const isAuth = await this.authService.updateAccount(haveUsername.AccountID, auth);
            if(!isAuth){
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Roles(Role.Customer)
    @Post('/updateCustomer/:Username')
    async updateCustomer(
        @Param('Username') username: string,
        @Body() auth: AuthPayloadCustomerDTO, 
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>>{
        try{
            const haveUsername = await this.authService.findByUsername(username)
            console.log("AccountID ", haveUsername.AccountID);
            const isAuth = await this.authService.updateCustomer(haveUsername.AccountID, auth);
            if(!isAuth){
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}