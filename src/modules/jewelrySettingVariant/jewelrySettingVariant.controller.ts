import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Public, Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ResponseType } from 'src/global/globalType';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JewelrySettingVariantService as JewelrySettingVariantService } from './jewelrySettingVariant.service';
import { JewelrySettingVariant } from 'src/models/jewelrySettingVariant.model';
import { JewelrySettingVariantDTO } from 'src/dto/jewelrySettingVariant.dto';

@ApiTags('JewelrySettingVariantApi')
@Controller('jewelrySettingVariant')
export class JewelrySettingVariantController {
    constructor(private jewelrySettingVariantService: JewelrySettingVariantService) {
    }

    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all Jewelry Setting Variant', 
        description: 'Retrieve all Jewelry Setting Variant from the database.' 
    })
    @Public()
    async findAll(): Promise<ResponseData<JewelrySettingVariant[]>> {
        try {
            const sizeMatchShell = await this.jewelrySettingVariantService.findAll();
            return new ResponseData<JewelrySettingVariant[]>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySettingVariant[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Post('/create')
<<<<<<< HEAD
    @ApiBody({ type: JewelrySettingVariantDTO, description: 'The data to create Jewelry Setting Variant '})
    @Roles(Role.Manager, Role.Customer)
=======
    @Roles(Role.Manager, Role.Customer, Role.Admin)
>>>>>>> develop
    async create(@Body() jewelrySettingVariantDTO: JewelrySettingVariantDTO): Promise<ResponseData<JewelrySettingVariant>> {
        try {
            const sizeMatchShell = await this.jewelrySettingVariantService.create(jewelrySettingVariantDTO);
            return new ResponseData<JewelrySettingVariant>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySettingVariant>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the Jewelry Setting Variant to update', type: Number })
    @Put('/update/:id')
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() sizeMatchShellDto: JewelrySettingVariantDTO): Promise<ResponseType<JewelrySettingVariant>> {
        try {
            const sizeMatchShell = await this.jewelrySettingVariantService.update(id, sizeMatchShellDto);
            return new ResponseData<JewelrySettingVariant>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySettingVariant>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }




    @ApiBearerAuth()
    @ApiParam({ name: 'JewelrySettingVariantID', description: 'ID for delete ', type: Number })
    @Delete('/delete/:JewelrySettingVariantID')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param() id: number): Promise<ResponseType<JewelrySettingVariant>> {
        try {
            const isDeleted = await this.jewelrySettingVariantService.delete(id);
            if (isDeleted) {
                return new ResponseData<JewelrySettingVariant>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } else {
                return new ResponseData<JewelrySettingVariant>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        } catch (error) {
            return new ResponseData<JewelrySettingVariant>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}