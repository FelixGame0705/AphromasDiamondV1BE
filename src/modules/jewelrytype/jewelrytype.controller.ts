import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { JewelryTypeService } from './jewelrytype.service';
import { Public, Roles } from "../../constants/decorator";
import { HttpMessage, HttpStatus, Role } from "../../global/globalEnum";
import { ResponseData } from "../../global/globalClass";
import { JewelryType } from "../../models/jewelrytype.model";
import { JewelryTypeDTO } from "../../dto/jewelrytype.dto";
import { ResponseType } from "../../global/globalType";
import { ApiTags } from "@nestjs/swagger";
 
@ApiTags('JewelryTypeApi')
@Controller('jewelrytype')
export class JewelryTypeController{
    constructor(private jewelrytypeService: JewelryTypeService){
    }

    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<JewelryType[]>> {
        try{
            const jewelrytype = await this.jewelrytypeService.findAll();
            return new ResponseData<JewelryType[]>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<JewelryType[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Admin)
    async create(@Body() jewelrytypeDto: JewelryTypeDTO): Promise<ResponseData<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.create(jewelrytypeDto);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number, @Body()  jewelrytypeDto: JewelryTypeDTO): Promise<ResponseType<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.update(id, jewelrytypeDto);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number): Promise<ResponseType<JewelryType>> {
        try {
            const jewelrytype = await this.jewelrytypeService.delete(id);
            return new ResponseData<JewelryType>(jewelrytype, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelryType>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}