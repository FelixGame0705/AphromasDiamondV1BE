import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Public, Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ProductDTO } from 'src/dto/product.dto';
import { ResponseType } from 'src/global/globalType';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/models/product.model';
import { ProductService } from './product.service';

@ApiTags('ProductApi')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {
    }


    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<Product[]>> {
        try {
            const product = await this.productService.findAll();
            return new ResponseData<Product[]>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get('/detail/:id')
    @ApiBearerAuth()
    @Public()
    //@ApiParam({ name: 'ProductID', description: 'ID of the order to delete', type: Number })
    // @ApiBody({ type: ProductDTO, description: 'The data to update' })
    async findDetail(@Param('id') id: number): Promise<ResponseType<Product>> {
        try {
            console.log('Hello')
            const product = await this.productService.findRelationById(id);
            return new ResponseData<Product>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: ProductDTO, description: 'The data to create' })
    @Roles(Role.Manager, Role.Customer, Role.Admin)
    async create(@Body() productDto: ProductDTO): Promise<ResponseData<Product>> {
        try {
            const product = await this.productService.create(productDto);
            return new ResponseData<Product>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    //@ApiParam({ name: 'ProductID', description: 'ID of the order to delete', type: Number })
    @ApiBody({ type: ProductDTO, description: 'The data to update' })
    @Put('/update/:id')
    @Roles(Role.Manager, Role.Admin)
    async update(@Param('id') id: number, @Body() productDto: ProductDTO): Promise<ResponseType<Product>> {
        try {
            const product = await this.productService.update(id, productDto);
            return new ResponseData<Product>(product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error)
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'ProductID', description: 'ID of the order to delete', type: Number })
    @Delete('/delete/:ProductID')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param() id: number): Promise<ResponseType<Product>> {
        try {
            const isDeleted = await this.productService.delete(id);
            if (isDeleted) {
                return new ResponseData<Product>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } else {
                return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}