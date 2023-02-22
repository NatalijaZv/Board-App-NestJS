import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class AuthService {
    constructor(
      @InjectRepository(UserRepository)
      private userRepository: UserRepository
    ){}    

    async signIn(authCredentialsDto: AuthCredentialsDto):Promise<string>{
      const {username, password }= authCredentialsDto; 
      const user = await this.userRepository.findOneBy({username: username})
      if(user && (await bcrypt.compare(password, user.password))) {
        return 'Successfuly logged in'
      }
      else {
        throw new UnauthorizedException('Login Failed')
      }
    }
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise <void> {
        return this.userRepository.createUser(authCredentialsDto)
    }
}
