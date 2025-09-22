import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}


  //1. Registrar novo usuário
  
  async register(email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Usuário já existe');

    const hash = await bcrypt.hash(password, 10); // hash da senha
    const user = new this.userModel({ email, password: hash });
    await user.save();

    return { message: 'Usuário registrado com sucesso' };
  }


//Validar usuário (nova função)
 
  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Senha inválida');

    return user; // retorna objeto usuário
  }

  // login
  async login(user: UserDocument) {
    const payload = { sub: user._id, email: user.email };
    return { token: this.jwtService.sign(payload) }; // retorna JWT
  }
}
