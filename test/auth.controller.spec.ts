import { Test, TestingModule } from '@nestjs/testing';
import { AuthPayloadDTO, AuthPayloadCustomerDTO } from 'src/dto/auth.dto';
import { Response } from 'express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus, Role } from 'src/global/globalEnum';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signIn: jest.fn()
  };

  const mockResponse = {
    json: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return success response on valid signIn', async () => {
      mockAuthService.signIn.mockResolvedValue(true);

      const authPayload: AuthPayloadDTO = {
          Email: 'Email', Password: 'duongso14',
          Name: null,
          PhoneNumber: null,
          Role: null
      };
      const result = await controller.signIn(authPayload, mockResponse);

      expect(service.signIn).toHaveBeenCalledWith(authPayload);
      expect(result).toEqual(new ResponseData(true, HttpStatus.SUCCESS, HttpMessage.SUCCESS));
    });

    it('should return error response on invalid signIn', async () => {
      mockAuthService.signIn.mockResolvedValue(false);

      const authPayload: AuthPayloadDTO = {
        Email: 'Email', Password: 'duongso14',
          Name: null,
          PhoneNumber: null,
          Role: null
      };
      const result = await controller.signIn(authPayload, mockResponse);

      expect(service.signIn).toHaveBeenCalledWith(authPayload);
      expect(result).toEqual(new ResponseData(false, HttpStatus.ERROR, HttpMessage.ERROR));
    });

    it('should return error response on exception', async () => {
      mockAuthService.signIn.mockRejectedValue(new Error());

      const authPayload: AuthPayloadDTO = {
        Email: 'Email55', Password: 'duongso14232',
          Name: null,
          PhoneNumber: null,
          Role: null
      };
      const result = await controller.signIn(authPayload, mockResponse);

      expect(result).toEqual(new ResponseData(null, HttpStatus.ERROR, HttpMessage.ERROR));
    });
  });

  // You can add similar tests for updateAccount and updateCustomer here.
});
