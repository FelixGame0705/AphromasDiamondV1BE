import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, UploadedFiles, Put, Body } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UsingImageService } from './usingImage.service';
import { Response } from 'express';
import { join } from 'path';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsingImageDTO, UsingImageUpdateDTO } from 'src/dto/usingImage.dto';
import { Public } from 'src/constants/decorator';
import { UsingImage } from 'src/models/usingImage.model';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { ResponseType } from 'src/global/globalType';

@ApiTags('Image')
@Controller('usingImage')
export class UsingImageController {

  constructor(private readonly usingImageService: UsingImageService) { }

  @Public()
  @Post("upload-entity")
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UsingImageDTO })
  @UseInterceptors(FilesInterceptor("files"))
  async uploadEntity(@UploadedFiles() files: Express.Multer.File[]) {
    const data = await this.usingImageService.create(files);
    console.log(data);
    return await Promise.all(data.map(async (entity) => {
      const host = "http://localhost:3000";
      return `${host}/usingImage/${(await entity).UsingImageID}`;
    }));
  }
  @Public()
  @Put('/update/:id')
  @ApiParam({ name: 'id', description: 'ID for update ', type: Number })
  
  async update(@Param('id') id: number, @Body() UsingImageDTO: UsingImageUpdateDTO): Promise<ResponseType<UsingImage>> {
    try {
      const usingImage = await this.usingImageService.update(id, UsingImageDTO);
      return new ResponseData<UsingImage>(usingImage, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<UsingImage>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @ApiParam({ name: 'id', description: 'ID for get image ', type: Number })
  @Public()
  @Get(":id")
  async getEntity(@Param("id") id: number, @Res() res: Response) {
    const data = await this.usingImageService.getOneById(id)
    res.sendFile(data.Name, { root: data.url });
  }
}
