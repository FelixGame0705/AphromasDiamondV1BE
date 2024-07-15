import { Body, Controller, Res, Post, UsePipes, ValidationPipe, Param, Delete, Get } from "@nestjs/common";
import { Response } from "express";
import { AuthPayloadCustomerDTO, AuthPayloadDTO, AuthPermission, AuthResponseDTO } from "src/dto/auth.dto";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus, Role } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { AuthService } from "./auth.service";
import { Public, Roles } from "src/constants/decorator";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(protected readonly authService: AuthService) {

    }
    @Roles(Role.Customer, Role.Admin)
    @ApiBearerAuth()
    @Post('/getCustomer/:id')
    async getCustomer(
        @Param('id') id: number
    ): Promise<ResponseType<AuthPayloadCustomerDTO>> {
        try {
            const result = await this.authService.findByIdCustomer(id)
            return new ResponseData<AuthPayloadCustomerDTO>(result, HttpStatus.ERROR, HttpMessage.ERROR)
        } catch (error) {
            console.error(error)
            return new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
    @Public()
    @Post('/signin')
    async signIn(
        @Body() auth: AuthPayloadDTO,
        @Res() res: Response
    ): Promise<ResponseType<AuthPermission | boolean>> {
        try {
            const isAuth = await this.authService.signIn(auth);
            if (!isAuth) {
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Public()
    @Post('/signup')
    @UsePipes(new ValidationPipe({ transform: true }))
    async signUp(
        @Body() auth: AuthPayloadDTO,
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>> {
        try {
            const isAuth = await this.authService.signUp(auth);
            if (!isAuth) {
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Public()
    @Post('/signupCustomer')
    async signUpCustomer(
        @Body() auth: AuthPayloadCustomerDTO,
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>> {
        try {
            const isAuth = await this.authService.signUpCustomer(auth);
            if (!isAuth) {
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    @Roles(Role.Admin, Role.DeliveryStaff, Role.Manager, Role.SaleStaff)
    @Public()
    @Post('/update/:Username')
    async updateAccount(
        @Param('Username') username: string,
        @Body() auth: AuthPayloadDTO,
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>> {
        try {
            const haveUsername = await this.authService.findByUsername(username)
            console.log("AccountID ", haveUsername.AccountID);
            const isAuth = await this.authService.updateAccount(haveUsername.AccountID, auth);
            if (!isAuth) {
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @Roles(Role.Customer)
    @Post('/updateCustomer/:Username')
    async updateCustomer(
        @Param('Username') username: string,
        @Body() auth: AuthPayloadCustomerDTO,
        @Res() res: Response
    ): Promise<ResponseType<AuthResponseDTO | boolean>> {
        try {
            const haveUsername = await this.authService.findByUsername(username)
            console.log("AccountID ", haveUsername.AccountID);
            const isAuth = await this.authService.updateCustomer(haveUsername.AccountID, auth);
            if (!isAuth) {
                return res.json(
                    new ResponseData(isAuth, HttpStatus.ERROR, HttpMessage.ERROR)
                );
            }
            return res.json(
                new ResponseData(isAuth, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            )
        } catch (error) {
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
    

    @Roles(Role.Admin, Role.Manager, Role.Customer)
    @Get('/ShowAllAccounts')
    @ApiOperation({
        summary: 'Get all accounts',
        description: 'Retrieve all accounts from the database.'
    })
    async getAllAccounts(@Res() res: Response): Promise<ResponseType<AuthResponseDTO[]>> {
        try {
            const accounts = await this.authService.findAllAccounts();
            return res.json(
                new ResponseData(accounts, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            );
        } catch (error) {
            console.error("Error fetching accounts:", error);
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
            );
        }
    }



    @ApiParam({ name: 'AccountID', description: 'ID of the account to delete', type: Number })
    @Delete('/delete/:AccountID')
    @Roles(Role.Admin, Role.Manager)
    async delete(
        @Param('AccountID') accountId: number, // Corrected parameter binding
        @Res() res: Response
    ): Promise<ResponseType<any>> { // Adjust the type based on your return type
        try {
            const result = await this.authService.deleteAccount(accountId); // Assuming authService.deleteAccount exists
            return res.json(
                new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            console.error("Error deleting account:", error);
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }

    @ApiParam({ name: 'AccountID', description: 'ID of the account to delete', type: Number })
    @Roles(Role.Customer, Role.Admin)
    @Delete('/deleteCustomer/:AccountID')
    async deleteCustomer(
        @Param('AccountID') accountId: number,
        @Res() res: Response
    ): Promise<ResponseType<any>> {
        try {
            const result = await this.authService.deleteCustomer(accountId);
            return res.json(
                new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS),
            );
        } catch (error) {
            console.error("Error deleting customer:", error);
            return res.json(
                new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR),
            );
        }
    }
}