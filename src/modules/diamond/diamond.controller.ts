import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { DiamondService } from "./diamond.service";
import { Diamond } from "src/models/diamond.model";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { ResponseType } from "src/global/globalType";
import { Roles } from "src/constants/decorator";
import { Response } from "express";
import { DiamondDTO } from "src/dto/diamond.dto";
@Controller('diamond')
export class DiamondController{
    constructor(private diamondService: DiamondService){
    }

    
    @Get('/showAll')
    @Roles(Role.Customer)
    // @Roles(Role.Admin 
    async list(@Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(new ResponseData(await this.diamondService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        }
        catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }

    
    @Post('/create')
    @Roles(Role.Customer)
    async create(@Body() diamond: DiamondDTO, @Res() res:Response): Promise<ResponseType<Diamond>>{
        try{
            return res.json(
                new ResponseData(await this.diamondService.create(diamond), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        }catch(error){
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}