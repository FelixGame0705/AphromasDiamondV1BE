import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { SizeDTO } from 'src/dto/size.dto';
import { ResponseType } from 'src/global/globalType';
import { ApiTags } from '@nestjs/swagger';
import { Size } from 'src/models/size.model';
import { SizeService } from './size.service';

@ApiTags('SizeApi')
@Controller('size')
export class SizeController{
    constructor(private  sizeService: SizeService){       
    }


    @Get('/showAll')
    @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<Size[]>> {
        try{
            const size = await this.sizeService.findAll();
            return new ResponseData<Size[]>(size, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Size[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Customer)
    async create(@Body()  sizeDto: SizeDTO): Promise<ResponseData<Size>> {
        try {
            const size = await this.sizeService.create(sizeDto);
            return new ResponseData<Size>(size, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Size>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() sizeDto: SizeDTO): Promise<ResponseType<Size>> {
        try {
            const size = await this.sizeService.update(id, sizeDto);
            return new ResponseData<Size>(size, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Size>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


     


    @Post('/delete')
@Roles(Role.Admin, Role.Manager, Role.Customer)
async delete(@Body() id: number ): Promise<ResponseType<Size>> {
    try {
        const isDeleted = await this.sizeService.delete(id);
        if (isDeleted) {
            return new ResponseData<Size>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } else {
            return new ResponseData<Size>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    } catch (error) {
        return new ResponseData<Size>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
}
}