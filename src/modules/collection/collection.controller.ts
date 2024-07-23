import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { Public, Roles } from "src/constants/decorator";
import { ResponseData } from "src/global/globalClass";
import { Collection, CollectionAll } from "src/models/collection.model";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { CollectionDTO } from "src/dto/collection.dto";
import { ResponseType } from "src/global/globalType";

@ApiTags('CollectionApi')
@Controller('collection')
export class CollectionController{
     
        constructor(private collectionService: CollectionService) {
        }
        
        @ApiBearerAuth()
        @Get('/showAll')
        @ApiOperation({ 
            summary: 'Get all collection', 
            description: 'Retrieve all collection from the database.' 
        })
        @Public()
        async findAll(): Promise<ResponseData<Collection[]>> {
            try{
                const collection = await this.collectionService.findAll();
                return new ResponseData<Collection[]>(collection, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
            }catch(error){
                return new ResponseData<Collection[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
            }
        }
    
        
        @ApiBearerAuth()
        @Get('/detail/:id')
        @ApiOperation({ 
            summary: 'Get detail collection', 
            description: 'Retrieve detail collection from the database.' 
        })
        @Public()
        async findDetail(@Param('id') id: number): Promise<ResponseData<CollectionAll>> {
            try{
                const collection = await this.collectionService.findRelationById(id);
                return new ResponseData<CollectionAll>(collection, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
            }catch(error){
                return new ResponseData<CollectionAll>(null, HttpStatus.ERROR, HttpMessage.ERROR );
            }
        }
     
    
    
        @ApiBearerAuth()
        @Post('/create')
        @ApiBody({ type: CollectionDTO, description: 'The data to create collection'})
        @Roles(Role.Admin, Role.Manager)
        async create(@Body() collectionDto: CollectionDTO): Promise<ResponseData<Collection>> {
            try {
                const collection = await this. collectionService.create(collectionDto) ;
                return new ResponseData<Collection>(collection, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } catch (error) {
                return new ResponseData<Collection>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        }
    
        @ApiBearerAuth()
        @ApiParam({ name: 'id', description: 'ID of the discount to update', type: Number })
        @Put('/update/:id')
        @Roles( Role.Admin, Role.Manager)
        async update(@Param('id') id: number, @Body() collectionDto: CollectionDTO): Promise<ResponseType<Collection>> {
            try {
                const collection = await this.collectionService.update(id,collectionDto);
                return new ResponseData<Collection>(collection, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } catch (error) {
                return new ResponseData<Collection>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        }
    
        @ApiBearerAuth()
        @ApiParam({ name: 'id', description: 'ID of the discount to delete', type: Number })
        @Delete('/delete/:id')
        @Roles(Role.Admin, Role.Manager)
        async delete(@Param('id') id: number): Promise<ResponseType<Collection>> {
            try {
                const collection = await this.collectionService.delete(id);
                return new ResponseData<Collection>(collection, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
            } catch (error) {
                return new ResponseData<Collection>(null, HttpStatus.ERROR, HttpMessage.ERROR);
            }
        }

        
    
    }
    
