import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TypeORMConfig } from './configs/typeorm.config';
import { DataSource } from 'typeorm';
// import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), BoardsModule, AuthModule],
})
// export class AppModule {}

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
