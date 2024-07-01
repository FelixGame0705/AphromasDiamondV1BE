import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { BillDiscount } from '../../models/billdiscount.model';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { BillDiscountDTO } from "src/dto/billdiscount.dto";
import { ResponseData } from "src/global/globalClass";
import { ResponseType } from "src/global/globalType";
import { BillDiscountService } from './billdiscount.service';

@ApiTags('BillDisCountApi')
@Controller('billdiscount')
export class BillDiscountController{
    constructor(private billdiscountService: BillDiscountService){
    }
    
    @Public()
    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<BillDiscount[]>> {
        try{
            const billdiscount = await this.billdiscountService.findAll();
            return new ResponseData<BillDiscount[]>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<BillDiscount[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager, Role.Admin)
    async create(@Body()billdiscountDto:BillDiscountDTO): Promise<ResponseData<BillDiscount>> {
        try {
            const billdiscount = await this.billdiscountService.create(billdiscountDto);
            return new ResponseData<BillDiscount>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<BillDiscount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number,@Body()billdiscountDto:BillDiscountDTO): Promise<ResponseType<BillDiscount>> {
        try {
            const billdiscount = await this.billdiscountService.update(id,billdiscountDto);
            return new ResponseData<BillDiscount>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<BillDiscount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Post('/delete')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number): Promise<ResponseType<BillDiscount>> {
        try {
            const billdiscount= await this.billdiscountService.delete(id);
            return new ResponseData<BillDiscount>(billdiscount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<BillDiscount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}