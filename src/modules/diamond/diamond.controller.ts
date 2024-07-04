import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, ValidationPipe } from "@nestjs/common";
import { DiamondService } from "./diamond.service";
import { Diamond } from "src/models/diamond.model";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { ResponseType } from "src/global/globalType";
import { IS_PUBLIC_KEY, Public, Roles } from "src/constants/decorator";
import { Response, Request } from "express";
import { DiamondDTO } from "src/dto/diamond.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('DiamondsApi')
@Controller('diamond')
export class DiamondController {
    constructor(private diamondService: DiamondService) {
    }
    
    @ApiBearerAuth()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all diamonds', 
        description: 'Retrieve all diamonds from the database.' 
    })
    
    @Public()
    // @Roles(Role.Admin 
    async list(@Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(new ResponseData(await this.diamondService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        }
        catch (error) {
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }

    @Get('/showDiamonds')
    @ApiQuery({ 
        name: 'page', 
        required: false, 
        type: Number, 
        description: 'Page number', 
        example: 1 
    })
    @ApiQuery({ 
        name: 'Shape', 
        required: false, 
        type: String, 
        description: 'Diamond shape' 
    })
    @ApiQuery({ 
        name: 'Color', 
        required: false, 
        type: String, 
        description: 'Diamond color' 
    })
    @ApiQuery({
        name: 'sortField',
        required: false,
        type: String,
        description: 'Field to sort'
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
            Shape: query.Shape,
            Color: query.Color
        };
        const sort = {
            field: query.sortField || 'Name',
            order: query.sortOrder || 'ASC'
        };

        return this.diamondService.getDiamonds(page, filters, sort);
    }

    @Get('/:id')
    @Public()
    @ApiParam({ name: 'id', description: 'ID of the diamond to watch detail', type: Number })
    // @Roles(Role.Admin 
    async detailProduct(@Param('id') id: number, @Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(new ResponseData(await this.diamondService.findRelationById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS));
        }
        catch (error) {
            console.log(error)
            return res.json(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
        }
    }



    @ApiBearerAuth()
    @Post('/create')
    @Roles(Role.Admin, Role.Manager)
    async create(@Body(new ValidationPipe()) diamond: DiamondDTO, @Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(
                new ResponseData(await this.diamondService.create(diamond), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the diamond to update', type: Number })
    @Put('/update/:id')
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() diamond: DiamondDTO, @Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(
                new ResponseData(await this.diamondService.update(id, diamond), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the diamond to delete', type: Number })
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() diamondId: number, @Res() res: Response): Promise<ResponseType<Diamond>> {
        try {
            return res.json(
                new ResponseData(await this.diamondService.delete(diamondId), HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}