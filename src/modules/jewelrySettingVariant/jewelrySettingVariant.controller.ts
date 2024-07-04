import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Public, Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ResponseType } from 'src/global/globalType';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JewelrySettingVariantService as JewelrySettingVariantService } from './jewelrySettingVariant.service';
import { JewelrySettingVariant } from 'src/models/jewelrySettingVariant.model';
import { JewelrySettingVariantDTO } from 'src/dto/jewelrySettingVariant.dto';

@ApiTags('JewelrySettingVariantApi')
@Controller('jewelrySettingVariant')
export class JewelrySettingVariantController {
    constructor(private jewelrySettingVariantService: JewelrySettingVariantService) {
    }

    @Get('/showAll')
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
    @Roles(Role.Manager, Role.Customer)
    async create(@Body() jewelrySettingVariantDTO: JewelrySettingVariantDTO): Promise<ResponseData<JewelrySettingVariant>> {
        try {
            const sizeMatchShell = await this.jewelrySettingVariantService.create(jewelrySettingVariantDTO);
            return new ResponseData<JewelrySettingVariant>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySettingVariant>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    @ApiBearerAuth()
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
    @Post('/delete')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number): Promise<ResponseType<JewelrySettingVariant>> {
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