import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { JewelryTypeService } from './jewelrytype.service';
import { Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { JewelryType } from "src/models/jewelrytype.model";
import { JewelryTypeDTO } from "src/dto/jewelrytype.dto";
import { ResponseType } from "src/global/globalType";
 
@Controller('jewelrytype')
export class JewelryTypeController{
    constructor(private jewelrytypeService: JewelryTypeService){
    }

    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<JewelryType[]>> {
        try{
            const jewelrytype = await this.jewelrytypeService.findAll();
            return new ResponseData<JewelryType[]>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<JewelryType[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager,Role.Customer)
    async create(@Body() jewelrytypeDto: JewelryTypeDTO): Promise<ResponseData<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.create(jewelrytypeDto);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body()  jewelrytypeDto: JewelryTypeDTO): Promise<ResponseType<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.update(id, jewelrytypeDto);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number): Promise<ResponseType<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.delete(id);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}