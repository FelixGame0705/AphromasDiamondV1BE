import { Body, Controller, Res,Post } from "@nestjs/common";
import { Response } from "express";
import { AuthPayloadDTO, AuthPermission, AuthResponseDTO } from "src/dto/auth.dto";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { AuthService } from "./auth.service";
import { Public } from "src/constants/decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

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
}