import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { MaterialJewelryService } from "./materialjewelry.service";
import { Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { MaterialJewelry } from "src/models/materialjewelry.model";
import { ResponseType } from "src/global/globalType";
import { JewelryTypeDTO } from "src/dto/jewelrytype.dto";
import { MaterialJewelryDTO } from "src/dto/materaljewelry.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('MaterialJewelryApi')
@Controller('materialjewelry')
export class MaterialJewelryController{
    constructor(private materialjewelryService: MaterialJewelryService){
    }

    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<MaterialJewelry[]>> {
        try{
            const materialjewelry = await this.materialjewelryService.findAll();
            return new ResponseData<MaterialJewelry[]>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<MaterialJewelry[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager,Role.Customer)
    async create(@Body() materialjewelryDto:  MaterialJewelryDTO): Promise<ResponseData<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.create(materialjewelryDto);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body()  materialjewelryDto:  MaterialJewelryDTO): Promise<ResponseType<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.update(id, materialjewelryDto);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number): Promise<ResponseType<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.delete(id);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}