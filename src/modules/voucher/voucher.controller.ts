import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Voucher } from '../../models/voucher.model';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { VoucherDTO } from "src/dto/voucher.dto";
import { ResponseData } from "src/global/globalClass";
import { ResponseType } from "src/global/globalType";
import { VoucherService as VoucherService } from './voucher.service';

@ApiTags('BillDisCountApi')
@Controller('billdiscount')
export class VoucherController{
    constructor(private voucherService: VoucherService){
    }
    
    @Public()
    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<Voucher[]>> {
        try{
            const billdiscount = await this.voucherService.findAll();
            return new ResponseData<Voucher[]>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Voucher[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Admin)
    async create(@Body()billdiscountDto:VoucherDTO): Promise<ResponseData<Voucher>> {
        try {
            const billdiscount = await this.voucherService.create(billdiscountDto);
            return new ResponseData<Voucher>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Voucher>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number,@Body()billdiscountDto:VoucherDTO): Promise<ResponseType<Voucher>> {
        try {
            const billdiscount = await this.voucherService.update(id,billdiscountDto);
            return new ResponseData<Voucher>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Voucher>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number): Promise<ResponseType<Voucher>> {
        try {
            const billdiscount= await this.voucherService.delete(id);
            return new ResponseData<Voucher>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Voucher>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}