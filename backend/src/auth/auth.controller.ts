import { Controller, Post, Body, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard'; // guard que valida token JWT

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // -----------------------------
  // Registrar novo usuário
  // -----------------------------
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  // -----------------------------
  // Login
  // -----------------------------
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response, // permite retornar JSON junto com cookie
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user);

    // Cookie HTTP-Only
    res.cookie('token', token.token, {
      httpOnly: true,     // não acessível por JS (mais seguro)
      secure: false,      // ⚠️ colocar true em produção (HTTPS)
      sameSite: 'strict', // evita envio cross-site
      maxAge: 1000 * 60 * 60, // 1h
    });

    return { success: true };
  }

  // -----------------------------
  // Logout
  // -----------------------------
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { success: true };
  }

  // -----------------------------
  // Endpoint para pegar dados do usuário logado
  // -----------------------------
  @UseGuards(JwtAuthGuard) // protege rota
  @Get('me')
  getMe(@Req() req: Request & { user?: any }) {
    // req.user é definido pelo JwtAuthGuard
    return { email: req.user?.email, id: req.user?.sub };
  }
}
