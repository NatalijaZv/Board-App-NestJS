import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Board } from 'src/boards/board.entity';
// import { BoardRepository } from 'src/boards/board.repository';

export const TypeORMConfig: TypeOrmModuleOptions = {

  type: 'postgres',
  host: 'localhost',
  port: 3000,
  username: 'BoardsApp',
  password: 'krneki123',
  database: 'boardproject',
  entities: [
    //   __dirname + '../**/*.entity.{js,ts}'
    // './**/*.entity.{js,ts}'
    Board, User
    ],
    
  synchronize: true,
};
