import { AuthPayloadCustomerDTO, AuthResponseDTO } from "src/dto/auth.dto";
import { AuthPermission } from "src/dto/auth.dto";
import { AuthPayloadDTO } from "src/dto/auth.dto";


export interface IAuthRepository{
    findAllAccounts(): Promise<AuthResponseDTO[]>;
    signIn(body: AuthPayloadDTO): Promise<AuthPermission | boolean>;
    signUp(body: AuthPayloadDTO): Promise<AuthResponseDTO>;
    signUpCustomer(body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO>;
    updateAccount(id: number,body: AuthPayloadDTO): Promise<AuthResponseDTO | boolean>;
    findByID(id:number): Promise<AuthResponseDTO>
    findByUsername(Email: string): Promise<AuthResponseDTO>
    updateCustomer(id: number, body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean>;
    deleteAccount(id: number): Promise<boolean>; // New method for deleting accounts
    deleteCustomer(id: number): Promise<boolean>; // New method for deleting customers
}