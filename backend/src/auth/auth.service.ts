import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // fake user só pra teste (depois liga ao banco)
  private users = [
    { id: 1, email: 'admin@test.com', password: '$2a$10$U6izM85ApgjQ3yXq9stB4OeFY4dLh17WosQvfZ7mSj1N4R0ovOjWm' } 
    // senha: "123456"
  ];

  async validateUser(email: string, password: string) {
    const user = this.users.find(u => u.email === email);
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Senha inválida');

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
