import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { SizeMatchShellDTO } from 'src/dto/sizeMatchShell.dto';
import { ResponseType } from 'src/global/globalType';
import { ApiTags } from '@nestjs/swagger';
import { SizeMatchShell } from 'src/models/sizeMatchShell.model';
import { SizeMatchShellService } from './sizeMatchShell.service';

@ApiTags('SizeMatchShellApi')
@Controller('sizeMatchShell')
export class SizeMatchShellController{
    constructor(private  sizeMatchShellService: SizeMatchShellService){       
    }


    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<SizeMatchShell[]>> {
        try{
            const sizeMatchShell = await this.sizeMatchShellService.findAll();
            return new ResponseData<SizeMatchShell[]>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<SizeMatchShell[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Customer)
    async create(@Body()  sizeMatchShellDto: SizeMatchShellDTO): Promise<ResponseData<SizeMatchShell>> {
        try {
            const sizeMatchShell = await this.sizeMatchShellService.create(sizeMatchShellDto);
            return new ResponseData<SizeMatchShell>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<SizeMatchShell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() sizeMatchShellDto: SizeMatchShellDTO): Promise<ResponseType<SizeMatchShell>> {
        try {
            const sizeMatchShell = await this.sizeMatchShellService.update(id, sizeMatchShellDto);
            return new ResponseData<SizeMatchShell>(sizeMatchShell, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<SizeMatchShell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


     


    @Post('/delete')
@Roles(Role.Admin, Role.Manager, Role.Customer)
async delete(@Body() id: number ): Promise<ResponseType<SizeMatchShell>> {
    try {
        const isDeleted = await this.sizeMatchShellService.delete(id);
        if (isDeleted) {
            return new ResponseData<SizeMatchShell>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<SizeMatchShell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    } catch (error) {
        return new ResponseData<SizeMatchShell>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
}
}