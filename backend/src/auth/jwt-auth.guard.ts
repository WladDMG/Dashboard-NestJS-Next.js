import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // Pega o request do Express
    const req: Request = context.switchToHttp().getRequest();

    // Pega o cookie 'token'
    const token = req.cookies['token'];
    if (!token) throw new UnauthorizedException('Usuário não autenticado');

    try {
      // Valida o JWT
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); // verifica assinatura e expiração
      req['user'] = payload; // opcional: adiciona payload no request para controllers
      return true; // rota permitida
    } catch (err) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
