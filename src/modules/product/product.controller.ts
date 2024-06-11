import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { ProductService } from './product.service';
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { ResponseData } from "src/global/globalClass";
import { Product } from "src/models/product.model";
import { ProductDTO } from "src/dto/product.dto";

 
@Controller('product')
export class ProductController{
    constructor(private ProductService: ProductService){
    }

    @Get('/showAll')
    @Public()
    async findAll(): Promise<ResponseData<Product[]>> {
        try{
            const Product = await this.ProductService.findAll();
            return new ResponseData<Product[]>(Product, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Product[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    
    @Post('/create')
    @Roles(Role.Manager,Role.Customer)
    async create(@Body() ProductDto: ProductDTO): Promise<ResponseData<Product>> {
        try {
            const Product = await this.ProductService.create(ProductDto);
            return new ResponseData<Product>(Product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Put('/update/:id')
    @Roles(Role.Customer)
    async update(@Param('id') id: number, @Body() ProductDto: ProductDTO): Promise<ResponseType<Product>> {
        try {
            const Product = await this.ProductService.update(id, ProductDto);
            return new ResponseData<Product>(Product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }


    @Post('/delete')
    @Roles(Role.Admin, Role.Manager, Role.Customer)
    async delete(@Body() id: number ): Promise<ResponseType<Product>> {
        try {
            const Product = await this.ProductService.delete(id);
            return new ResponseData<Product>(Product, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Product>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}