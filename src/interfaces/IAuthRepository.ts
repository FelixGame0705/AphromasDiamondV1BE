import { AuthResponseDTO } from "src/dto/auth.dto";
import { AuthPermission } from "src/dto/auth.dto";
import { AuthPayloadDTO } from "src/dto/auth.dto";


export interface IAuthRepository{
    signIn(body: AuthPayloadDTO): Promise<AuthPermission | boolean>;
    signUp(body: AuthPayloadDTO): Promise<AuthResponseDTO>;
}