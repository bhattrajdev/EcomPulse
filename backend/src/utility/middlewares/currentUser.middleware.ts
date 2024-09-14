import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserEntity;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const token = authHeader.split(' ')[1];
      const { id } = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as JwtPayload;
      const user = await this.usersService.findOne(+id);
      
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      req.currentUser = user;

    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
