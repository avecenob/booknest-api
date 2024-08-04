import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInfo, RegisterInfo } from './interfaces/auth.interface';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginInfo: LoginInfo) {
    const { username } = loginInfo;
    const user = await this.userRepository.findOneBy({ username });

    const isValid = await bcrypt.compare(loginInfo.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      status: 200,
      message: `user id: ${user.id} logged in`,
      data: access_token,
    };
  }

  async register(user: RegisterInfo) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return this.userService.create(user);
  }
}
