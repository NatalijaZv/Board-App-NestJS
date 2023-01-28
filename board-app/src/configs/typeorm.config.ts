import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 3000,
  username: 'postgres',
  password: 'krneki123',
  database: 'boardproject',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
}