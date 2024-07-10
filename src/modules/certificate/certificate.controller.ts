import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CertificateService } from "./certificate.service";
import { Public, Roles } from "src/constants/decorator";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseData } from "src/global/globalClass";
import { Certificate } from "src/models/certificate.model";
import { ResponseType } from "src/global/globalType";
import { CertificateDTO } from "src/dto/certificate.dto";

@ApiTags('CertificateApi')
@Controller('certificate')
export class CertificateController{
    constructor(private certificateService: CertificateService){
    }
    @ApiBearerAuth() 
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all Certificate', 
        description: 'Retrieve all Certificate from the database.' 
    })
    @Public()
    async findAll(): Promise<ResponseData<Certificate[]>> {
        try{
            const certicate = await this.certificateService.findAll();
            return new ResponseData<Certificate[]>(certicate, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Certificate[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    @Public()
    @Get('/:CertificateID')
    @ApiParam({ name: 'CertificateID', description: 'ID of the diamond to watch detail', type: Number })
    async findDetail(@Param('CertificateID')CertificateID: number): Promise<ResponseData<Certificate>> {
        try{
            const certificate = await this.certificateService.findRelationById(CertificateID);
            return new ResponseData<Certificate>(certificate, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            console.log(error)
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    @ApiBearerAuth()
    @Post('/create')
    @Roles(Role.Manager,Role.Admin)
    async create(@Body() certificateDto:  CertificateDTO): Promise<ResponseData<Certificate>> {
        try {
            const certificate = await this.certificateService.create(certificateDto);
            return new ResponseData<Certificate>(certificate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the certificate to update', type: Number })
    @Put('/update/:id')
    @Roles(Role.Admin, Role.Manager)
    async update(@Param('id') id: number, @Body() certificateDto:  CertificateDTO): Promise<ResponseType<Certificate>> {
        try {
            const certificate = await this.certificateService.update(id, certificateDto);
            return new ResponseData<Certificate>(certificate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the certificate to delete', type: Number })
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Param('id') id: number): Promise<ResponseType<Certificate>> {
        try {
            const certificate = await this.certificateService.delete(id);
            return new ResponseData<Certificate>(certificate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}