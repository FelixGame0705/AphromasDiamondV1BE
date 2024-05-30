import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { debug } from 'console';
import { jwtConstants } from 'src/constants/constant';
import { IS_PUBLIC_KEY } from 'src/constants/decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);// Lấy metadata IS_PUBLIC_KEY từ handler hoặc class. Nếu isPublic là true, nghĩa là route này không cần bảo vệ (công khai).
    if (isPublic) {//Nếu route công khai, guard trả về true cho phép yêu cầu tiếp tục
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();//Lấy đối tượng request từ context (HTTP context).
    const token = this.extractTokenFromHeader(request);//Gọi phương thức để trích xuất token từ header của request.
    console.log("Request: ", context.getClass())
    if (!token) {//Nếu không có token, ném ra ngoại lệ UnauthorizedException.
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {//Xác thực token không đồng bộ với secret key từ jwtConstants.
        secret: jwtConstants.secret,
      });
      console.log("Payload: ", payload)
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;//Gán payload vào đối tượng request để có thể sử dụng trong các route handlers.
      console.log('User ', request['user'])
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];// Tách chuỗi Authorization thành mảng, mặc định là mảng rỗng nếu không có header Authorization.
    return type === 'Bearer' ? token : undefined;//Nếu loại (type) là 'Bearer', trả về token; nếu không, trả về undefined.
  }
}
