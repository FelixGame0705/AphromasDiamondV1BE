import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Public, Roles } from "src/constants/decorator";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Response } from "express";
import { OrderLineService } from "./orderLine.service";
import { OrderLineDTO } from "src/dto/orderline.dto";
import { OrderLine } from "src/models/orderline.model";

@ApiTags('OrderLineApi')
@Controller("orderLine")
export class OrderLineController {
    constructor(private orderService: OrderLineService) {}

    @Roles(Role.Customer, Role.Admin)
    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({
        summary: 'Get all order',
        description: 'Retrieve all orders from the database.'
    })
    async list(@Res() res: Response): Promise<ResponseType<OrderLine>> {
        try {
            return res.json(new ResponseData(await this.orderService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }

    @Get('/showOrders')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
        example: 1
    })
    @ApiQuery({
        name: 'Search',
        required: false,
        type: String,
        description: 'Search information'
    })
    @ApiQuery({
        name: 'Status',
        required: false,
        type: String,
        description: 'Filter status'
    })
    @Public()
    async showProducts(@Query() query: any) {
        const page: number = parseInt(query.page as any) || 1;
        const filters = {
            Status: query.Status
        };
        const sort = {
            field: query.sortField || 'Date',
            order: query.sortOrder || 'ASC'
        };

        return this.orderService.getOrders(page, filters, sort);
    }

    @Roles(Role.Customer, Role.Admin)
    @ApiBearerAuth()
    @Get('/:id')
    @ApiParam({ name: 'id', description: 'ID of the order to watch detail', type: Number })
    async detailProduct(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<OrderLine>> {
        try {
            return res.json(new ResponseData(await this.orderService.findById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        } catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }

    @Roles(Role.Customer, Role.Admin)
    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: OrderLineDTO, description: 'The data to create a new order' })
    async create(@Body(new ValidationPipe()) order: OrderLineDTO, @Res() res: Response): Promise<ResponseType<OrderLine>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.create(order), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Roles(Role.Customer, Role.Admin, Role.Manager)
    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the order to update', type: Number })
    @Put('/update/:id')
    @ApiBody({ type: OrderLineDTO, description: 'The data to update' })
    async update(@Param('id') id: number, @Body(new ValidationPipe()) order: OrderLineDTO, @Res() res: Response): Promise<ResponseType<OrderLine>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.update(id, order), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'OrderLineID', description: 'ID of the order to delete', type: Number })
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    @Delete('/delete/:OrderLineID')
    async delete(@Param() orderID: number, @Res() res: Response): Promise<ResponseType<OrderLine>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.delete(orderID), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            console.log(error)
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}
