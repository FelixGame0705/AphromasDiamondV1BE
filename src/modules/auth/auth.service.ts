import { Inject, Injectable } from "@nestjs/common";
import { AuthPayloadCustomerDTO, AuthPayloadDTO, AuthPermission, AuthResponseDTO } from "src/dto/auth.dto";
import { IAuthRepository } from "src/interfaces/IAuthRepository";

@Injectable()
export class AuthService{
    constructor(
        @Inject('IAuthRepository')
        protected readonly authRepository: IAuthRepository
    ){}
    async signIn(auth: AuthPayloadDTO): Promise<AuthPermission | boolean>{
        const{Username, Password} = auth;
        if(!Username || !Password) return false;

        const isAuth = await this.authRepository.signIn(auth);
        if(!isAuth) return false;
        return isAuth;
    }

    async signUp(auth: AuthPayloadDTO): Promise<AuthResponseDTO | boolean>{
        const{Username, Password} = auth;
        if(!Username || !Password) return false;

        const userDTO : AuthResponseDTO = new AuthResponseDTO(await this.authRepository.signUp(auth));
        return userDTO;
    }

    async signUpCustomer(auth: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean>{
        const{Username, Password} = auth;
        if(!Username || !Password) return false;

        const userDTO : AuthResponseDTO = new AuthResponseDTO(await this.authRepository.signUpCustomer(auth));
        return userDTO;
    }

    async updateAccount(id:number, auth: AuthPayloadDTO): Promise<AuthResponseDTO | boolean>{
        return this.authRepository.updateAccount(id, auth);
    }

    async updateCustomer(id: number, body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean>{
        return this.authRepository.updateCustomer(id, body);
    }

    async findByUsername(username:string){
        return this.authRepository.findByUsername(username)
    }
}