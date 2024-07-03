import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { JewelryTypeService } from './jewelryType.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { JewelryTypeDTO } from "src/dto/jewelrytype.dto";
import { ResponseType } from "src/global/globalType";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JewelryType } from "src/models/jewelryType.model";
 
@ApiTags('JewelryTypeApi')
@Controller('jewelrytype')
export class JewelryTypeController{
    constructor(private jewelrytypeService: JewelryTypeService){
    }
    @Public()
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

    @ApiBearerAuth()
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

    @ApiBearerAuth()
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

    @ApiBearerAuth()
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