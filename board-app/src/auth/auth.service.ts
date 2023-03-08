import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository,
      private jwtService: JwtService
    ){}    

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<{accessToken :string}>{
      const {username, password }= authCredentialsDto; 
      const user = await this.userRepository.findOneBy({username: username})
      if(user && (await bcrypt.compare(password, user.password))) {
        // if login is successful we need to create jwt token
        const payload = {username}  //we can put other things in payload too - in this case we only need
        const accessToken = await this.jwtService.sign(payload)
        return {accessToken}
      }
      else {
        throw new UnauthorizedException('Login Failed')
      }
    }
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.createUser(authCredentialsDto)
    }
}
