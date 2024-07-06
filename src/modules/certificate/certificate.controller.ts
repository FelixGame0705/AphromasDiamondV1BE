import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
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
    @Public()
    @Get('/showAll')
    @ApiOperation({ 
        summary: 'Get all certificates', 
        description: 'Retrieve all certificates from the database.' 
    })
    // @Roles(Role.Customer, Role.Manager, Role.Admin)
    async findAll(): Promise<ResponseData<Certificate[]>> {
        try{
            const certicate = await this.certificateService.findAll();
            return new ResponseData<Certificate[]>(certicate, HttpStatus.SUCCESS, HttpMessage.SUCCESS );
        }catch(error){
            return new ResponseData<Certificate[]>(null, HttpStatus.ERROR, HttpMessage.ERROR );
        }
    }

    @ApiBearerAuth()
    @Post('/create')
    @ApiBody({ type: CertificateDTO, description: 'The data to create certificate'})
    @Roles(Role.Manager,Role.Customer)
    async create(@Body() certificateDto:  CertificateDTO): Promise<ResponseData<Certificate>> {
        try {
            const certicate = await this.certificateService.create(certificateDto);
            return new ResponseData<Certificate>(certicate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
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
            const certicate = await this.certificateService.update(id, certificateDto);
            return new ResponseData<Certificate>(certicate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @ApiBearerAuth()
    @ApiParam({ name: 'id', description: 'ID of the certificate to delete', type: Number })
    @Delete('/delete/:id')
    @Roles(Role.Admin, Role.Manager)
    async delete(@Body() id: number ): Promise<ResponseType<Certificate>> {
        try {
            const certicate = await this.certificateService.delete(id);
            return new ResponseData<Certificate>(certicate, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Certificate>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    
        
    
    
    
}