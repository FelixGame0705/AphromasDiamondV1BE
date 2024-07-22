import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Public, Roles } from "src/constants/decorator";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { Order } from "src/models/order.model";
import { OrderService } from "./order.service";
import { OrderDTO, PaymentDTO } from "src/dto/order.dto";
import { Response } from "express";

@ApiTags('OrderApi')
@Controller("order")
export class OrderController{
    constructor(private orderService: OrderService) {
    }
    
    @Roles(Role.Customer, Role.Admin, Role.DeliveryStaff, Role.Manager, Role.SaleStaff)
    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all order', 
        description: 'Retrieve all orders from the database.' 
    })
    // @Roles(Role.Admin 
    async list(@Res() res: Response): Promise<ResponseType<Order>> {
        try {
            return res.json(new ResponseData(await this.orderService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        }
        catch (error) {
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
            field: query.sortField || 'OrderDate',
            order: query.sortOrder || 'ASC'
        };

        return this.orderService.getOrders(page, filters, sort);
    }

    // @ApiBearerAuth()
    // @Get('/:id')
    // @Roles(Role.Customer, Role.Admin, Role.DeliveryStaff, Role.Manager, Role.SaleStaff)
    // @ApiParam({ name: 'id', description: 'ID of the order to watch detail', type: Number })
    // // @Roles(Role.Admin 
    // async detailProduct(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Order>> {
    //     try {
    //         return res.json(new ResponseData(await this.orderService.findRelationById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    //     }
    //     catch (error) {
    //         return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    //     }
    // }

    @ApiBearerAuth()
    @Get("/detail/:id")
    @Roles(Role.Customer, Role.Admin)
    @ApiParam({ name: 'id', description: 'ID of the order to watch relation', type: Number })
    async findRelationById(
        @Param('id') id: number, 
        @Res()res: Response){
        try {
            return res.json(new ResponseData(await this.orderService.findRelationById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        }
        catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }


    @Roles(Role.Customer, Role.Admin)
    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: OrderDTO, description: 'The data to create an existing order'})
    async create(@Body(new ValidationPipe()) order: OrderDTO, @Res() res: Response): Promise<ResponseType<Order>> {
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

    @ApiBearerAuth()
    @Roles(Role.Customer, Role.Admin, Role.DeliveryStaff, Role.SaleStaff)
    @ApiParam({ name: 'OrderID', description: 'ID of the order to update', type: Number })
    @Put('/update/:OrderID')
    async update(@Param('OrderID') id: number, @Body(new ValidationPipe()) order: OrderDTO, @Res() res: Response): Promise<ResponseType<Order>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.update(id, order), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            console.log(error)
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiBearerAuth()
    @Roles(Role.Customer, Role.Admin)
    @ApiParam({ name: 'id', description: 'ID of the order to update', type: Number })
    @Put('/payment/:id')
    async payment(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Order>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.payment(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiBearerAuth()
    @Delete('/delete/:OrderID')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Param('OrderID') orderID: number, @Res() res: Response): Promise<ResponseType<Order>> {
        try {
            return res.json(
                new ResponseData(await this.orderService.delete(orderID), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}