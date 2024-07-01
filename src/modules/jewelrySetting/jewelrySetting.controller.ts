import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { JewelrySettingService } from './jewelrySetting.service';
import { Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ShellDTO } from 'src/dto/shell.dto';
import { JewelrySetting } from 'src/models/jewelrySetting.model';
import { ResponseType } from 'src/global/globalType';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('JewelrySetting')
@Controller('jewelrySetting')
export class JewelrySettingController {
    constructor(private jewelrySettingService: JewelrySettingService) {
    }


    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<JewelrySetting[]>> {
        try {
            const shell = await this.jewelrySettingService.findAll();
            return new ResponseData<JewelrySetting[]>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySetting[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/create')
    @Roles(Role.Manager, Role.Customer)
    async create(@Body() shellDto: ShellDTO): Promise<ResponseData<JewelrySetting>> {
        try {
            const shell = await this.jewelrySettingService.create(shellDto);
            return new ResponseData<JewelrySetting>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() shellDto: ShellDTO): Promise<ResponseType<JewelrySetting>> {
        try {
            const shell = await this.jewelrySettingService.update(id, shellDto);
            return new ResponseData<JewelrySetting>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<JewelrySetting>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number): Promise<ResponseType<JewelrySetting>> {
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