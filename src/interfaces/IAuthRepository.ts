import { AuthPayloadCustomerDTO, AuthResponseDTO } from "src/dto/auth.dto";
import { AuthPermission } from "src/dto/auth.dto";
import { AuthPayloadDTO } from "src/dto/auth.dto";


export interface IAuthRepository{
    
    

    signIn(body: AuthPayloadDTO): Promise<AuthPermission | boolean>;

    signUp(body: AuthPayloadDTO): Promise<AuthResponseDTO>;

    signUpCustomer(body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO>;

    detailAccount(id: number): Promise<AuthResponseDTO>;

    updateAccount(id: number,body: AuthPayloadDTO): Promise<AuthResponseDTO | boolean>;
    // findByID(id:number): Promise<AuthResponseDTO>
    findByUsername(Email: string): Promise<AuthResponseDTO>
    findByIdCustomer(id: number): Promise<AuthPayloadCustomerDTO>
    updateCustomer(id: number, body: AuthPayloadCustomerDTO): Promise<AuthResponseDTO | boolean>;
    
    getIdField(): string;

    findById(id:number): Promise<AuthResponseDTO>;

    findByUsername(Email: string): Promise<AuthResponseDTO>;
    
    findRelationById(id: number): Promise<AuthResponseDTO>;

    findAllAccounts(): Promise<AuthResponseDTO[]>;

    deleteAccount(id: number): Promise<boolean>; // New method for deleting accounts    
    
    deleteCustomer(id: number): Promise<boolean>; // New method for deleting customers
}