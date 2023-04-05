import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { Auth } from "./entities/auth.entity";
import { Profile } from "../profile/entities/profile.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { TokenDto } from "./dto/token.dto";
import { RegisterResponseDto } from "./dto/register-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private jwtService: JwtService
  ) {
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const { login, password, ...profileData } = registerDto;
    const existingUser = await this.authRepository.findOne({ where: { login } });

    if (existingUser) {
      throw new Error("User with this login already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAuthUser = this.authRepository.create({
      login,
      password: hashedPassword,
      role: "user"
    });
    await this.authRepository.save(newAuthUser);

    const newProfileUser = this.profileRepository.create({
      ...profileData,
      auth: newAuthUser
    });
    await this.profileRepository.save(newProfileUser);

    const token = await this.generateToken(newAuthUser);
    return { token, ...newProfileUser };
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.validateUser(loginDto);
    const token = await this.generateToken(user);
    return { token };
  }

  private async generateToken(user: Auth): Promise<string> {
    const payload: Token = { userId: user.id, roles: user.role };
    return this.jwtService.sign(payload);
  }

  private async validateUser(loginDto: LoginDto): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { login: loginDto.login } });
    if (!user) {
      throw new HttpException("Неправильный логин или пароль.", HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordEquals) {
      throw new HttpException("Неправильный логин или пароль.", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}