import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Discount } from 'src/models/discount.model';
import { DiscountService } from "./discount.service";
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ResponseData } from "src/global/globalClass";
import { DiscountDTO } from "src/dto/discount.dto";

@ApiTags('DiscountApi')
@Controller('discount')
export class DiscountController {
    constructor(private discountService: DiscountService) {
    }
    
    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all discount', 
        description: 'Retrieve all discount from the database.' 
    })
    @Public()
    async findAll(): Promise<ResponseData<Discount[]>> {
        try{
            const discount = await this.discountService.findAll();
            return new ResponseData<Discount[]>(discount, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Discount[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
     
    @Public()
    @Get('/:DiscountID')
    @ApiParam({ name: 'DiscountID', description: 'Discount detail', type: Number })
    async detailDiscount(@Param('DiscountID')DiscountID: number): Promise<ResponseType<Discount>> {
        try {
            const discount = await this.discountService.findRelationById(DiscountID);
            return new ResponseData<Discount>(discount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        }catch (error) {
            return new ResponseData<Discount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }



    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: DiscountDTO, description: 'The data to create discount'})
    @Roles(Role.Customer, Role.Admin, Role.Manager)
    async create(@Body() discountDto:DiscountDTO): Promise<ResponseData<Discount>> {
        try {
            const discount = await this.discountService.create(discountDto);
            return new ResponseData<Discount>(discount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Discount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the discount to update', type: Number })
    @Put('/update/:id')
    @Roles(Role.Customer, Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() discountDto:DiscountDTO): Promise<ResponseType<Discount>> {
        try {
            const discount = await this.discountService.update(id,discountDto);
            return new ResponseData<Discount>(discount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Discount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the discount to delete', type: Number })
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Param('id') id: number): Promise<ResponseType<Discount>> {
        try {
            const discount = await this.discountService.delete(id);
            return new ResponseData<Discount>(discount, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Discount>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

}