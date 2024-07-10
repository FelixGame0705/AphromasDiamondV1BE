import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MaterialJewelryService } from "./materialjewelry.service";
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { MaterialJewelry } from "src/models/materialjewelry.model";
import { ResponseType } from "src/global/globalType";
import { MaterialJewelryDTO } from "src/dto/materaljewelry.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('MaterialJewelryApi')
@Controller('materialjewelry')
export class MaterialJewelryController{
    constructor(private materialjewelryService: MaterialJewelryService){
    }
    @ApiBearerAuth()
    @Public()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all  Material Jewelry', 
        description: 'Retrieve all Material Jewelry from the database.' 
    })
    async findAll(): Promise<ResponseData<MaterialJewelry[]>> {
        try{
            const materialjewelry = await this.materialjewelryService.findAll();
            return new ResponseData<MaterialJewelry[]>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<MaterialJewelry[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type:  MaterialJewelryDTO, description: 'The data to create Material Jewelry '})
    @Roles(Role.Manager, Role.Admin)
    async create(@Body() materialjewelryDto:  MaterialJewelryDTO): Promise<ResponseData<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.create(materialjewelryDto);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Put('/update/:id')
    @ApiParam({ name: 'id', description: 'ID for update ', type: Number })
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body()  materialjewelryDto:  MaterialJewelryDTO): Promise<ResponseType<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.update(id, materialjewelryDto);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Delete('/delete/:id')
    @ApiParam({ name: 'id', description: 'ID for delete ', type: Number })
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param() id: number): Promise<ResponseType<MaterialJewelry>> {
        try {
            const materialjewelry = await this.materialjewelryService.delete(id);
            return new ResponseData<MaterialJewelry>(materialjewelry, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<MaterialJewelry>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}