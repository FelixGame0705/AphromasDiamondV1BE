import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Public, Roles } from 'src/constants/decorator';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ProductDTO } from 'src/dto/product.dto';
import { ResponseType } from 'src/global/globalType';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

    @Get('/showProducts')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number',
        example: 1
    })
    @ApiQuery({
        name: 'Brand',
        required: false,
        type: String,
        isArray: true,
        description: 'Brand product'
    })
    @ApiQuery({
        name: 'Name',
        required: false,
        isArray: false,
        type: String,
        description: 'Name of product'
    })
    @ApiQuery({
        name: 'minPrice',
        required: false,
        type: Number,
        description: 'Min price'
    })
    @ApiQuery({
        name: 'maxPrice',
        required: false,
        type: Number,
        description: 'Max price'
    })
    
    @ApiQuery({
        name: 'JewelryType',
        required: false,
        isArray: true,
        type: String,
        description: 'JewelryType'
    })
    @ApiQuery({
        name: 'Collection',
        required: false,
        isArray: true,
        type: String,
        description: 'Product collection'
    })
    @ApiQuery({
        name: 'DiamondShape',
        required: false,
        isArray: true,
        type: String,
        description: 'Diamond shape'
    })
    @ApiQuery({
        name: 'sortField',
        required: false,
        type: String,
        description: 'Field to sort: Date, Name'
    })
    @ApiQuery({
        name: 'sortOrder',
        required: false,
        type: String,
        description: 'ASC or DESC'
    })
    @Public()
    async showProducts(@Query() query: any) {
        const page: number = parseInt(query.page as any) || 1;
        const filters = {
            DiamondShape: Array.isArray(query.DiamondShape) ? query.DiamondShape : (query.DiamondShape ? query.DiamondShape.split(',') : []),
            Brand: Array.isArray(query.Brand) ? query.Brand : (query.Brand ? query.Brand.split(',') : []),
            Name: query.Name,
            Collection: Array.isArray(query.Collection) ? query.Collection : (query.Collection ? query.Collection.split(',') : []),
            JewelryType: Array.isArray(query.JewelryType) ? query.JewelryType : (query.JewelryType ? query.JewelryType.split(',') : []),
            minPrice: query.minPrice,
            maxPrice: query.maxPrice,
        };
        const sort = {
            field: query.sortField || 'Name',
            order: query.sortOrder || 'ASC'
        };
        console.log('Diamond 1980: ', filters.DiamondShape)
        return this.productService.getProducts(page, filters, sort);
    }

    @Get('/detail/:id')
    @ApiBearerAuth()
    @Public()
    async findDetail(@Param('id') id: number): Promise<ResponseType<Product>> {
        try {
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
    @Delete('/delete/:ProductID')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param('ProductID') id: number): Promise<ResponseType<Product>> {
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