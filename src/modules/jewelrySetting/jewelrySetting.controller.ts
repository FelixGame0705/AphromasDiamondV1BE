import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { JewelrySettingService } from './jewelrySetting.service';
import { Public, Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import {JewelrySettingDTO } from 'src/dto/jewelrySetting.dto';
import { JewelrySetting, JewelrySettingAll } from 'src/models/jewelrySetting.model';
import { ResponseType } from 'src/global/globalType';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('JewelrySetting')
@Controller('jewelrySetting')
export class JewelrySettingController {
    constructor(private jewelrySettingService: JewelrySettingService) {
    }

    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all jewelry setting', 
        description: 'Retrieve all jewelry setting from the database.' 
    })
    @Public()
    async findAll(): Promise<ResponseData<JewelrySettingAll[]>> {
        try {
            const jewelrySetting = await this.jewelrySettingService.findAll();
            return new ResponseData<JewelrySettingAll[]>(jewelrySetting, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<JewelrySettingAll[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID for create ', type: Number })
    @Get('/detail/:id')
    @Public()
    async findDetail(@Param('id') id:number): Promise<ResponseData<JewelrySettingAll>> {
        try {
            const jewelrySetting = await this.jewelrySettingService.findRelationById(id);
            return new ResponseData<JewelrySettingAll>(jewelrySetting, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<JewelrySettingAll>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Roles(Role.Manager, Role.Admin)
    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: JewelrySettingDTO, description: 'The data to create discount'})
    @Roles(Role.Manager, Role.Admin)
    async create(@Body() jewelrySettingDTO: JewelrySettingDTO): Promise<ResponseData<JewelrySetting>> {
        try {
            const shell = await this.jewelrySettingService.create(jewelrySettingDTO);
            return new ResponseData<JewelrySetting>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Put('/update/:id')
    @ApiParam({ name: 'id', description: 'ID for update ', type: Number })
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() jewelrySettingDTO: JewelrySettingDTO): Promise<ResponseType<JewelrySetting>> {
        try {
            const shell = await this.jewelrySettingService.update(id, jewelrySettingDTO);
            return new ResponseData<JewelrySetting>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID for delete ', type: Number })
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param() id: number): Promise<ResponseType<JewelrySetting>> {
        try {
            const isDeleted = await this.jewelrySettingService.delete(id);
            if (isDeleted) {
                return new ResponseData<JewelrySetting>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } else {
                return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        } catch (error) {
            return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}