import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ShellService } from './shell.service';
import { Roles } from '../../constants/decorator';
import { HttpMessage, HttpStatus, Role } from '../../global/globalEnum';
import { ResponseData } from '../../global/globalClass';
import { ShellDTO } from '../../dto/shell.dto';
import { Shell } from '../../models/shell.model';
import { ResponseType } from '../../global/globalType';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ShellApi')
@Controller('shell')
export class ShellController {
    constructor(private shellService: ShellService) {
    }


    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<Shell[]>> {
        try {
            const shell = await this.shellService.findAll();
            return new ResponseData<Shell[]>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Shell[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/create')
    @Roles(Role.Manager, Role.Customer)
    async create(@Body() shellDto: ShellDTO): Promise<ResponseData<Shell>> {
        try {
            const shell = await this.shellService.create(shellDto);
            return new ResponseData<Shell>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Shell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() shellDto: ShellDTO): Promise<ResponseType<Shell>> {
        try {
            const shell = await this.shellService.update(id, shellDto);
            return new ResponseData<Shell>(shell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Shell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number): Promise<ResponseType<Shell>> {
        try {
            const isDeleted = await this.shellService.delete(id);
            if (isDeleted) {
                return new ResponseData<Shell>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } else {
                return new ResponseData<Shell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        } catch (error) {
            return new ResponseData<Shell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}