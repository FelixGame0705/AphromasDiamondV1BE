import { Controller, Get } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { Role } from "src/global/globalEnum";
import { Roles } from "src/constants/decorator";
import { ApiTags } from "@nestjs/swagger";


@Controller('user')
@Roles(Role.Customer)
@ApiTags('User')
export class UserController {


    @Get()
    getUser() {
        return 'Hello world'
    }
}